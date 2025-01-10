package com.acervi.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.acervi.backend.model.PhysicalDescription;

@Repository
public interface PhysicalDescriptionRepository extends JpaRepository<PhysicalDescription, Long> {
    
}
