package com.acervi.backend.model;

import jakarta.persistence.Entity;

@Entity
public class Edicao {

    private String marc250numeroEditadaRevisada;

    public String getNumeroEditadaRevisada() {
        return marc250numeroEditadaRevisada;
    }

    public void setNumeroEditadaRevisada(String numeroEditadaRevisada) {
        this.marc250numeroEditadaRevisada = numeroEditadaRevisada;
    }
}
