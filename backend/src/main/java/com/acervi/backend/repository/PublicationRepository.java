package com.acervi.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.acervi.backend.model.Publication;

@Repository
public interface PublicationRepository extends JpaRepository<Publication, String>{
    
}
