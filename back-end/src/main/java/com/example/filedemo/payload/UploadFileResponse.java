package com.example.filedemo.payload;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UploadFileResponse {
    private int id;
    private String fileName;
    private String fileDownloadUri;
    private String path;
    private String fileType;
    private long size;
    private String description;
    private int status;
    private long createOn;
    private long modifiedOn;
    private int folderId;
    private String folderName;

    private List<UploadFileResponse> files;
}
