package com.example.filedemo.controller;

import com.example.filedemo.common.Common;
import com.example.filedemo.exception.FileStorageException;
import com.example.filedemo.model.entity.DBFile;
import com.example.filedemo.payload.FileFilterRequest;
import com.example.filedemo.payload.PagingListResponse;
import com.example.filedemo.payload.UploadFileResponse;
import com.example.filedemo.repository.FileRepository;
import com.example.filedemo.service.FileStorageService;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import lombok.val;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/api/file")
@CrossOrigin("http://localhost:3000")
public class FileController {

    private static final Logger logger = LoggerFactory.getLogger(FileController.class);
    @Autowired
    private FileStorageService fileStorageService;
    @Autowired
    private FileRepository fileRepository;

// upload 1 file
    @PostMapping
    public UploadFileResponse uploadFile(@RequestParam("file") MultipartFile file,@RequestParam("description") String description) throws IOException {
        // lưu file vào db
        DBFile dbFile = fileStorageService.storeFile(file,description);

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/downloadFile/"+dbFile.getId())
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

    @PostMapping(value = "/list")
    public List<UploadFileResponse> uploadMultipleFiles(@RequestParam("files") MultipartFile[] files,@RequestParam("description") String description)throws IOException {
        return fileStorageService.uploadFiles(files, description);
    }
    @PutMapping(value = "{id}")
    public UploadFileResponse updateFile(@RequestParam("id") int id,@RequestParam("file") MultipartFile file,@RequestParam("description") String description) throws IOException {

        DBFile dbFile = fileStorageService.updateFile(file,id,description);
        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/downloadFile/"+dbFile.getId())
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
    @GetMapping(value = "{id}")
    public UploadFileResponse getById(@PathVariable("id") int id) throws IOException {
        val dbFile = fileRepository.findById(id);
        if(dbFile.get() == null) throw new FileStorageException("không tìm thấy file");
        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/downloadFile/"+dbFile.get().getId())
                .toUriString();
        UploadFileResponse uploadFileResponse = new UploadFileResponse();
        uploadFileResponse.setFileName(dbFile.get().getName());
        uploadFileResponse.setFileType(dbFile.get().getType());
        uploadFileResponse.setFileDownloadUri(fileDownloadUri);
        uploadFileResponse.setDescription(dbFile.get().getDescription());
        uploadFileResponse.setStatus(dbFile.get().getStatus());
        uploadFileResponse.setModifiedOn(dbFile.get().getModifiedOn());
        uploadFileResponse.setCreateOn(dbFile.get().getCreatedOn());
        return uploadFileResponse;
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") int id){
        val dbFile = fileRepository.findById(id);
        if(dbFile.get() == null) throw new FileStorageException("không tìm thấy file");
        dbFile.get().setModifiedOn(Common.getTimestamp());
        dbFile.get().setStatus(Common.FileStatus.DELETED);
        try {
            fileRepository.save(dbFile.get());
        } catch (Exception e) {
            throw new FileStorageException("Xoá file thất bại");
        }

    }
    @GetMapping(value = "/download/{id}")
    public ResponseEntity<Resource> downloadFile(@PathVariable int id) throws MalformedURLException {
        // Load file from database
        val dbFile = fileRepository.findById(id);
        byte[] bytes = String.valueOf(dbFile.get().getSize()).getBytes(StandardCharsets.UTF_8);
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(dbFile.get().getType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + dbFile.get().getName() + "\"")
                .body(new ByteArrayResource(bytes));
    }

    @GetMapping
    public PagingListResponse<UploadFileResponse> filter(FileFilterRequest filter){
        return fileStorageService.filter(filter);
    }

}
