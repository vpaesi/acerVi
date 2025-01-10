package com.acervi.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.acervi.backend.model.Edition;

@Repository
public interface EditionRepository extends JpaRepository<Edition, String> {
    
}
