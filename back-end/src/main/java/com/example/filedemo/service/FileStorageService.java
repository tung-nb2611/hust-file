package com.example.filedemo.service;

import com.example.filedemo.common.Common;
import com.example.filedemo.common.FileStorageProperties;
import com.example.filedemo.exception.FileStorageException;
import com.example.filedemo.exception.MyFileNotFoundException;
import com.example.filedemo.model.entity.DBFile;
import com.example.filedemo.repository.FileRepository;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class FileStorageService {

    private final Path fileStorageLocation;
    @Autowired
    private FileRepository fileRepository;

    @Autowired
    // lưu file vào thư mục đã setup
    public FileStorageService(FileStorageProperties fileStorageProperties) {
        this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir())
                .toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new FileStorageException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }

    public DBFile storeFile(MultipartFile file,String description) throws IOException {
        // lấy tên file
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        // Check nếu tên file trống báo lỗi
            if(fileName.contains("..")) {
                throw new FileStorageException("Sorry! Filename contains invalid path sequence " + fileName);
            }
            DBFile dbFile = new DBFile();
            dbFile.setName(fileName);
            dbFile.setType(file.getContentType());
            dbFile.setDescription(description);
            dbFile.setStatus(Common.FileStatus.ACTIVE);
            dbFile.setCreatedOn(Common.getTimestamp());
        return fileRepository.save(dbFile);
    }
    public DBFile updateFile(MultipartFile file, int id,String description) throws IOException {
        val dbFile = fileRepository.findById(id);
        if(dbFile.get() == null) throw new FileStorageException("không tìm thấy file");
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        if(fileName.contains("..")) {
            throw new FileStorageException("Sorry! Filename contains invalid path sequence " + fileName);
        }
        dbFile.get().setName(fileName);
        dbFile.get().setType(file.getContentType());
        dbFile.get().setDescription(description);
        dbFile.get().setModifiedOn(Common.getTimestamp());
        return fileRepository.save(dbFile.get());
    }
}
