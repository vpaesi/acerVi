package com.acervi.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.acervi.backend.model.TitleMain;

@Repository
public interface TitleMainRepository extends JpaRepository<TitleMain, String> {
    
}
