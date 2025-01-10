package com.acervi.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.acervi.backend.model.SubjectPersonal;

@Repository
public interface SubjectPersonalRepository extends JpaRepository<SubjectPersonal, String>{

}
