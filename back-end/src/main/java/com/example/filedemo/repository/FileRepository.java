package com.example.filedemo.repository;

import com.example.filedemo.model.entity.DBFile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FileRepository extends JpaRepository<DBFile, Integer>,JpaSpecificationExecutor<DBFile> {
    @Query(value = "Select * from file as f where  lower(concat(f.name, '', f.description, '', f.type, '')) like lower(?1) and f.status in (?2)  ", nativeQuery = true)
    Page<DBFile> filter(String query, List<Integer> statuses, Pageable pageable);
}
