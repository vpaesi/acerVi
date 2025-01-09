package com.acervi.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.acervi.backend.model.EntradaSecundariaSerie;

@Repository
public interface EntradaSecundariaSerieRepository extends JpaRepository<EntradaSecundariaSerie, Long> {
}
