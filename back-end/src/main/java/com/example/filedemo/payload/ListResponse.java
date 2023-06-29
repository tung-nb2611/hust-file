package com.example.filedemo.payload;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ListResponse<T> {
    private final List<T> data;

    public ListResponse(List<T> data) {
        this.data = data;
    }
}
