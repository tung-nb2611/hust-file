package com.example.filedemo.payload;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UploadFileResponse {
    private String fileName;
    private String fileDownloadUri;
    private String fileType;
    private long size;
    private String description;
    private int status;
    private long createOn;
    private long modifiedOn;

}
