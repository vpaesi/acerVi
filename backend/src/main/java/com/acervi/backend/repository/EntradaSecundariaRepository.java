package com.acervi.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.acervi.backend.model.EntradaSecundaria;

@Repository
public interface EntradaSecundariaRepository extends JpaRepository<EntradaSecundaria, String>{
    
}
