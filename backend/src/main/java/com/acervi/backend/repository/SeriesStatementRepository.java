package com.acervi.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.acervi.backend.model.SeriesStatement;

@Repository
public interface SeriesStatementRepository extends JpaRepository<SeriesStatement, String>{
}
