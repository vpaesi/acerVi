package com.acervi.backend.model;

import jakarta.persistence.Entity;

@Entity
public class SerieRelacionada {

    private String marc490TituloSerieColecao;
    private int marc490Volume;

    public String getMarc490TtuloSerieColecao() {
        return marc490TituloSerieColecao;
    }
    public void setMarc490TtuloSerieColecao(String marc490TtuloSerieColecao) {
        this.marc490TituloSerieColecao = marc490TtuloSerieColecao;
    }
    public int getMarc490Volume() {
        return marc490Volume;
    }
    public void setMarc490Volume(int marc490Volume) {
        this.marc490Volume = marc490Volume;
    }
}
