package com.example.filedemo.service;

import com.example.filedemo.common.Common;
import com.example.filedemo.common.FileStorageProperties;
import com.example.filedemo.exception.FileStorageException;
import com.example.filedemo.model.entity.DBFile;
import com.example.filedemo.payload.FileFilterRequest;
import com.example.filedemo.payload.PagingListResponse;
import com.example.filedemo.payload.UploadFileResponse;
import com.example.filedemo.repository.FileRepository;
import lombok.val;
import lombok.var;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@Service
public class FileStorageService {

    private final Path fileStorageLocation;
    @Autowired
    private FileRepository fileRepository;
    @Value("${file.upload-dir}")
    private String sourceFile;

    private final ModelMapper mapper;

    @Autowired
    // lưu file vào thư mục đã setup
    public FileStorageService(FileStorageProperties fileStorageProperties, ModelMapper mapper) {
        this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir())
                .toAbsolutePath().normalize();
        this.mapper = mapper;

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new FileStorageException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }

    public DBFile storeFile(MultipartFile file, String description) throws IOException {
        // lấy tên file
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        // Check nếu tên file trống báo lỗi
        if (fileName.contains("..")) {
            throw new FileStorageException("Sorry! Filename contains invalid path sequence " + fileName);
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

    public DBFile updateFile(MultipartFile file, int id, String description) throws IOException {
        val dbFile = fileRepository.findById(id);
        if (dbFile.get() == null) throw new FileStorageException("không tìm thấy file");
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        if (fileName.contains("..")) {
            throw new FileStorageException("Sorry! Filename contains invalid path sequence " + fileName);
        }
        dbFile.get().setName(fileName);
        dbFile.get().setType(file.getContentType());
        dbFile.get().setDescription(description);
        dbFile.get().setModifiedOn(Common.getTimestamp());
        return fileRepository.save(dbFile.get());
    }

    public UploadFileResponse uploadFile(MultipartFile file, String description) throws IOException {
        DBFile dbFile = storeFile(file, description);

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/downloadFile/" + dbFile.getId())
                .toUriString();
        UploadFileResponse uploadFileResponse = new UploadFileResponse();
        uploadFileResponse.setSize(file.getSize());
        uploadFileResponse.setFileName(dbFile.getName());
        uploadFileResponse.setFileType(dbFile.getType());
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
            for (var file : files) {
                var uploadFileResponse = uploadFile(file, description);
                responses.add(uploadFileResponse);
            }
        }
        return responses;
    }

    public PagingListResponse<UploadFileResponse> filter(FileFilterRequest filter){
        var query = "%" + filter.getQuery() + "%";
        Sort sort = Sort.by(Sort.Direction.ASC, "id");
        Pageable pageable = PageRequest.of(filter.getPage(), filter.getLimit(), sort);
        List<Integer> statuses = new ArrayList<>();
        if(filter.getStatuses() != null){
            val statusArr = filter.getStatuses().split(",");
            for (var status: statusArr) {
                if(status.equals("1")){
                    statuses.add(1);
                }
                if (status.equals("2"))
                    statuses.add(2);
            }
        }else{
            statuses.add(1);
        }
        var files = fileRepository.filter(query, pageable);
        List<UploadFileResponse> responses = new ArrayList<>();
        for (val file: files.getContent()) {
            var response = mapper.map(file, UploadFileResponse.class);
            responses.add(response);
        }
        return new PagingListResponse<>(
                responses,
                new PagingListResponse.Metadata(filter.getPage(), filter.getLimit(), files.getTotalElements()));
    }
}
