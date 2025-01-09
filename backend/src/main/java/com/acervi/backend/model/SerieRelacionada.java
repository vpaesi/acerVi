package com.acervi.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class SerieRelacionada {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String marc490TituloSerieColecao;
    private int marc490Volume;

    public SerieRelacionada() {}

    public SerieRelacionada(Long id, String marc490TituloSerieColecao, int marc490Volume) {
        this.id = id;
        this.marc490TituloSerieColecao = marc490TituloSerieColecao;
        this.marc490Volume = marc490Volume;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMarc490TituloSerieColecao() {
        return marc490TituloSerieColecao;
    }

    public void setMarc490TituloSerieColecao(String marc490TituloSerieColecao) {
        this.marc490TituloSerieColecao = marc490TituloSerieColecao;
    }

    public int getMarc490Volume() {
        return marc490Volume;
    }

    public void setMarc490Volume(int marc490Volume) {
        this.marc490Volume = marc490Volume;
    }

    public String getMarc490SerieRelacionada() {
        return marc490TituloSerieColecao + " - Volume " + marc490Volume;
    }
}
