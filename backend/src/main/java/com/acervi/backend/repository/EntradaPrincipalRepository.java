package com.acervi.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.acervi.backend.model.EntradaPrincipal;

@Repository
public interface EntradaPrincipalRepository extends JpaRepository<EntradaPrincipal, String> {
    
}
