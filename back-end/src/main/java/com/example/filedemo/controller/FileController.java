package com.example.filedemo.controller;

import com.example.filedemo.common.Common;
import com.example.filedemo.exception.FileStorageException;
import com.example.filedemo.model.entity.DBFile;
import com.example.filedemo.payload.*;
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

import java.sql.Blob;
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

    //Upload nhiều file
    @PostMapping(value = "/list")
    public List<UploadFileResponse> uploadMultipleFiles(@RequestParam("files") MultipartFile[] files,
                                                        @RequestParam("description") String description,
                                                        @RequestParam("folder_id") int folderId)throws IOException {
        return fileStorageService.uploadFiles(files, description, folderId);
    }
    //Api xóa file
    @DeleteMapping("/{id}/delete")
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
    //Api cập nhật mô tả file
    @PutMapping("/edit/{id}")
    public UploadFileResponse update(@PathVariable("id") int id, @RequestBody FileRequest request){
        val dbFile = fileRepository.findById(id);
        if(dbFile.get() == null) throw new FileStorageException("không tìm thấy file");
        dbFile.get().setModifiedOn(Common.getTimestamp());
        dbFile.get().setDescription(request.getDescription());
        try {
            fileRepository.save(dbFile.get());
        } catch (Exception e) {
            throw new FileStorageException("Cập nhật file thành công");
        }
        return fileStorageService.mapperFileResponse(dbFile.get());
    }
    //Api download file
    @GetMapping(value = "/download/{id}")
    public ResponseEntity<?> downloadFile(@PathVariable int id) {
        return fileStorageService.downloadFile(id);
    }
    //Api download file
    @CrossOrigin
    @GetMapping(value = "/view/{id}")
    public ResponseEntity<byte[]>  viewFile(@PathVariable int id)  throws IOException{
        return fileStorageService.getImage(id);
    }

    //Api filter file
    @GetMapping
    public PagingListResponse<UploadFileResponse> filter(FileFilterRequest filter) throws IOException{
        return fileStorageService.filter(filter);
    }


    //Api tạo folder
    @PostMapping
    public UploadFileResponse addFolder(@RequestBody FolderRequest request){

    }

}
