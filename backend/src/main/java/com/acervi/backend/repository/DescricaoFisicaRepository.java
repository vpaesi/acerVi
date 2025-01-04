package com.acervi.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.acervi.backend.model.DescricaoFisica;

@Repository
public interface DescricaoFisicaRepository extends JpaRepository<DescricaoFisica, String>{
    
}
