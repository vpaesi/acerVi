package com.acervi.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.acervi.backend.model.EntryAdded;

@Repository
public interface EntryAddedRepository extends JpaRepository<EntryAdded, String>{
    
}
