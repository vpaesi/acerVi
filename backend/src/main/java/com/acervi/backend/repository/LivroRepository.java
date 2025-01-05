package com.acervi.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.acervi.backend.model.Livro;

@Repository
public interface LivroRepository extends JpaRepository<Livro, Long> {
}
