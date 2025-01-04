package com.acervi.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.acervi.backend.model.Cutter;

@Repository
public interface CutterRepository extends JpaRepository<Cutter, String>{
    
}
