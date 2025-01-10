package com.acervi.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.acervi.backend.model.EntryAddedSerie;

@Repository
public interface EntryAddedSerieRepository extends JpaRepository<EntryAddedSerie, Long> {
}
