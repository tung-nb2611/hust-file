package com.example.filedemo.model.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "file")
@Getter
@Setter
public class DBFile {
    @Id // xác định đây là khoá chính.
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto-increment.
    @Column(name = "id")
    private int id;
    @Column(name = "name")
    private String name;
    @Column(name = "type")
    private String type;
    @Column(name = "path")
    private String path;
    @Column(name = "description")
    private String description;
    @Column(name = "size")
    private String size;
    @Column(name = "status")
    private int status;
    @Column(name = "created_on")
    private long createdOn;
    @Column(name = "modified_on")
    private long modifiedOn;

}
