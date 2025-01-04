package com.acervi.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.acervi.backend.model.CDU;

@Repository
public interface CDURepository extends JpaRepository<CDU, Long> {
    
}
