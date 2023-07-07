package com.example.filedemo.payload;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FolderRequest {
    private String name;
    private Integer folderId;
}
