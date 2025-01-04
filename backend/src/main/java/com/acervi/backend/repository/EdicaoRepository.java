package com.acervi.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.acervi.backend.model.Edicao;

@Repository
public interface EdicaoRepository extends JpaRepository<Edicao, String> {
    
}
