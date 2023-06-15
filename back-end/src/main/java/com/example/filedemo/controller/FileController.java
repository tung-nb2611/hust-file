package com.example.filedemo.controller;

import com.example.filedemo.model.entity.DBFile;
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
public class FileController {

    private static final Logger logger = LoggerFactory.getLogger(FileController.class);



    @Autowired
    private FileStorageService fileStorageService;
    @Autowired
    private FileRepository fileRepository;


    @PostMapping("/uploadFile")
    public UploadFileResponse uploadFile(@RequestParam("file") MultipartFile file) throws IOException {
        DBFile dbFile = fileStorageService.storeFile(file);

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/downloadFile/"+dbFile.getId())
                .toUriString();
        UploadFileResponse uploadFileResponse = new UploadFileResponse();
        uploadFileResponse.setSize(file.getSize());
        uploadFileResponse.setFileName(dbFile.getName());
        uploadFileResponse.setFileType(dbFile.getType());
        uploadFileResponse.setFileDownloadUri(fileDownloadUri);

        return uploadFileResponse;
    }

    @PostMapping("/uploadMultipleFiles")
    public List<UploadFileResponse> uploadMultipleFiles(@RequestParam("files") MultipartFile[] files)throws IOException {
        return Arrays.asList(files)
                .stream()
                .map(file -> {
                    try {
                        return uploadFile(file);
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                    return null;
                })
                .collect(Collectors.toList());
    }

    @GetMapping("/downloadFile/{id}")
    public ResponseEntity<Resource> downloadFile(@PathVariable int id) throws MalformedURLException {
        // Load file from database
        val dbFile = fileRepository.findById(id);
//        Path filePath = this.fileStorageLocation.resolve(dbFile.get().getName()).normalize();
//        Resource resource = new UrlResource(filePath.toUri());
        // string to byte[]
        byte[] bytes = dbFile.get().getSize().getBytes(StandardCharsets.UTF_8);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(dbFile.get().getType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + dbFile.get().getName() + "\"")
                .body(new ByteArrayResource(bytes));
    }

}
