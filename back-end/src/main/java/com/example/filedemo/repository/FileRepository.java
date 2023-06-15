package com.example.filedemo.repository;

import com.example.filedemo.model.entity.DBFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface FileRepository extends JpaRepository<DBFile, Integer>,JpaSpecificationExecutor<DBFile> {

}
