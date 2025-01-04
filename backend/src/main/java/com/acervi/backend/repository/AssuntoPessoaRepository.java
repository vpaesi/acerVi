package com.acervi.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.acervi.backend.model.AssuntoPessoa;

@Repository
public interface AssuntoPessoaRepository extends JpaRepository<AssuntoPessoa, String>{

}
