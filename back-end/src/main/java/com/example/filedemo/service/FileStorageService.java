package com.example.filedemo.service;

import com.example.filedemo.common.Common;
import com.example.filedemo.common.FileDownloadUtil;
import com.example.filedemo.exception.FileStorageException;
import com.example.filedemo.model.entity.DBFile;
import com.example.filedemo.payload.FileFilterRequest;
import com.example.filedemo.payload.PagingListResponse;
import com.example.filedemo.payload.UploadFileResponse;
import com.example.filedemo.repository.FileRepository;
import lombok.val;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import org.apache.commons.io.IOUtils;

import javax.imageio.ImageIO;

@Service
public class FileStorageService {

    private final FileRepository fileRepository;
    @Value("${file.upload-dir}")
    private String sourceFile;

    private final ModelMapper mapper;

    public FileStorageService(FileRepository fileRepository, ModelMapper mapper) {
        this.fileRepository = fileRepository;
        this.mapper = mapper;

    }

    public DBFile storeFile(MultipartFile file, String description) throws IOException {
        // lấy tên file
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        // Check nếu tên file trống báo lỗi
        if (fileName.contains("..")) {
            throw new FileStorageException("Tên file chứa path không hợp lệ" + fileName);
        }
        DBFile dbFile = new DBFile();
        dbFile.setName(fileName);
        dbFile.setType(file.getContentType());
        dbFile.setDescription(description);
        dbFile.setStatus(Common.FileStatus.ACTIVE);
        dbFile.setCreatedOn(Common.getTimestamp());
        dbFile.setModifiedOn(Common.getTimestamp());
        dbFile.setSize(file.getSize());
        //Chuyển file cần lưu vào folder lưu trữ
        file.transferTo(new File(
                sourceFile + file.getOriginalFilename()));
        return fileRepository.save(dbFile);
    }

    public UploadFileResponse uploadFile(MultipartFile file, String description) throws IOException {
        DBFile dbFile = storeFile(file, description);

        UploadFileResponse uploadFileResponse = mapperFileResponse(dbFile);
        return uploadFileResponse;
    }

    public UploadFileResponse mapperFileResponse(DBFile dbFile) {
        UploadFileResponse uploadFileResponse = new UploadFileResponse();
        uploadFileResponse.setSize(dbFile.getSize());
        uploadFileResponse.setId(dbFile.getId());
        uploadFileResponse.setFileName(dbFile.getName());
        uploadFileResponse.setPath(ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/upload/" + dbFile.getName())
                .toUriString());
        uploadFileResponse.setFileType(dbFile.getType());
        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/downloadFile/" + dbFile.getId())
                .toUriString();
        uploadFileResponse.setFileDownloadUri(fileDownloadUri);
        uploadFileResponse.setDescription(dbFile.getDescription());
        uploadFileResponse.setStatus(dbFile.getStatus());
        uploadFileResponse.setModifiedOn(dbFile.getModifiedOn());
        uploadFileResponse.setCreateOn(dbFile.getCreatedOn());
        return uploadFileResponse;
    }

    public List<UploadFileResponse> uploadFiles(MultipartFile[] files, String description) throws IOException {
        List<UploadFileResponse> responses = new ArrayList<>();
        if (files != null && files.length > 0) {
            for (val file : files) {
                val uploadFileResponse = uploadFile(file, description);
                responses.add(uploadFileResponse);
            }
        }
        return responses;
    }

    public PagingListResponse<UploadFileResponse> filter(FileFilterRequest filter) {
        val query = "%" + (filter.getQuery() != null ? filter.getQuery() : "") + "%";
        Sort sort = Sort.by(Sort.Direction.ASC, "id");
        Pageable pageable = PageRequest.of(filter.getPage() - 1, filter.getLimit(), sort);
        List<Integer> statuses = new ArrayList<>();
        if (filter.getStatuses() != null) {
            val statusArr = filter.getStatuses().split(",");
            for (val status : statusArr) {
                if (status.equals("1")) {
                    statuses.add(1);
                }
                if (status.equals("2"))
                    statuses.add(2);
            }
        } else {
            statuses.add(1);
        }
        val files = fileRepository.filter(query, statuses, pageable);
        List<UploadFileResponse> responses = new ArrayList<>();
        for (val file : files.getContent()) {
            val response = mapperFileResponse(file);
            responses.add(response);
        }
        return new PagingListResponse<>(
                responses,
                new PagingListResponse.Metadata(filter.getPage(), filter.getLimit(), files.getTotalElements()));
    }

    public ResponseEntity<?> downloadFile(int id) {

        FileDownloadUtil downloadUtil = new FileDownloadUtil();
        Resource resource = null;
        val dbFile = fileRepository.findById(id);
        try {
            resource = downloadUtil.getFileAsResource(dbFile.get().getName(), sourceFile);
        } catch (IOException e) {
            return ResponseEntity.badRequest().build();
        }

        if (resource == null) {
            return new ResponseEntity<>("File not found", HttpStatus.NOT_FOUND);
        }
        String contentType = "application/octet-stream";
        String headerValue = "attachment; filename=\"" + resource.getFilename() + "\"";
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, headerValue)
                .body(resource);
    }
    public ResponseEntity<byte[]> getImage (int id) throws IOException {
        val dbFile = fileRepository.findById(id);
        FileDownloadUtil downloadUtil = new FileDownloadUtil();
        Resource resource = null;
        try {
            resource = downloadUtil.getFileAsResource(dbFile.get().getName(), sourceFile);
        } catch (IOException e) {
            return ResponseEntity.badRequest().build();
        }
        BufferedImage originalImage = ImageIO.read(resource.getInputStream());
        int originalHeight = originalImage.getHeight();
        int originalWidth = originalImage.getWidth();
        int newWidth = (int) Math.round((double) 20 / originalHeight * originalWidth);
        Image scaledImage = originalImage.getScaledInstance(720, 300, Image.SCALE_SMOOTH);
        BufferedImage bufferedScaledImage = new BufferedImage(720, 300, BufferedImage.TYPE_INT_RGB);
        bufferedScaledImage.getGraphics().drawImage(scaledImage, 0, 0 , null);
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(bufferedScaledImage, "jpg", baos);
        byte[] imageBytes = baos.toByteArray();
        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG)
                .body(imageBytes);
    }

}
