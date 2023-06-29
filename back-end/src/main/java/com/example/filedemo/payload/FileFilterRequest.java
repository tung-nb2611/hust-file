package com.example.filedemo.payload;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class FileFilterRequest extends PagingFilterRequest {
    private String query;
    private String statuses;
}
