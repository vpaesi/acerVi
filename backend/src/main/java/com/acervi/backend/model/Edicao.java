package com.acervi.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Edicao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String marc250numeroEditadaRevisada;

    private String marc250Edicao;

    public Edicao() {}

    public Edicao(Long id, String marc250numeroEditadaRevisada) {
        this.id = id;
        this.marc250numeroEditadaRevisada = marc250numeroEditadaRevisada;
    }

    public String getMarc250Edicao() {
        return marc250Edicao;
    }

    public void setMarc250Edicao(String marc250Edicao) {
        this.marc250Edicao = marc250Edicao;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMarc250numeroEditadaRevisada() {
        return marc250numeroEditadaRevisada;
    }

    public void setMarc250numeroEditadaRevisada(String marc250numeroEditadaRevisada) {
        this.marc250numeroEditadaRevisada = marc250numeroEditadaRevisada;
    }

}
