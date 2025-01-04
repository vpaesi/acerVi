package com.acervi.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.acervi.backend.model.SerieRelacionada;

@Repository
public interface SerieRelacionadaRepository extends JpaRepository<SerieRelacionada, String>{
}
