package com.acervi.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class AssuntoPessoa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String marc650SobrenomeAssuntoPessoa;
    private String marc650NomeAssuntoPessoa;

    public AssuntoPessoa() {}
    
    public AssuntoPessoa(String marc650SobrenomeAssuntoPessoa, String marc650NomeAssuntoPessoa) {
        this.marc650SobrenomeAssuntoPessoa = marc650SobrenomeAssuntoPessoa;
        this.marc650NomeAssuntoPessoa = marc650NomeAssuntoPessoa;
    }
    
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getmarc650SobrenomeAssuntoPessoa() {
        return marc650SobrenomeAssuntoPessoa;
    }
    public void setmarc650SobrenomeAssuntoPessoa(String marc650SobrenomeAssuntoPessoa) {
        this.marc650SobrenomeAssuntoPessoa = marc650SobrenomeAssuntoPessoa;
    }
    public String getmarc650NomeAssuntoPessoa() {
        return marc650NomeAssuntoPessoa;
    }
    public void setmarc650NomeAssuntoPessoa(String marc650NomeAssuntoPessoa) {
        this.marc650NomeAssuntoPessoa = marc650NomeAssuntoPessoa;
    }
}
