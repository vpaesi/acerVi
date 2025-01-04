package com.acervi.backend.model;

import jakarta.persistence.Entity;

@Entity
public class EntradaSecundariaSerie {

    private String marc800TituloSerieColecao;
    private int marc800Volume;
    public String getMarc800TtuloSerieColecao() {
        return marc800TituloSerieColecao;
    }
    public void setMarc800TtuloSerieColecao(String marc800TtuloSerieColecao) {
        this.marc800TituloSerieColecao = marc800TtuloSerieColecao;
    }
    public int getMarc800Volume() {
        return marc800Volume;
    }
    public void setMarc800Volume(int marc800Volume) {
        this.marc800Volume = marc800Volume;
    }
}
