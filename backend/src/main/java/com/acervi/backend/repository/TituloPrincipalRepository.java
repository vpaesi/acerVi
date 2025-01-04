package com.acervi.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.acervi.backend.model.TituloPrincipal;

@Repository
public interface TituloPrincipalRepository extends JpaRepository<TituloPrincipal, String> {
    
}
