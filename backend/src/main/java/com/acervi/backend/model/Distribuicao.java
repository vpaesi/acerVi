package com.acervi.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Distribuicao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String marc260Editora;
    private int marc260Data;

    public Distribuicao() {}

    public Distribuicao(Long id, String marc260Editora, int marc260Data) {
        this.id = id;
        this.marc260Editora = marc260Editora;
        this.marc260Data = marc260Data;
    }

    public Distribuicao(String marc260Editora, int marc260Data) {
        this.marc260Editora = marc260Editora;
        this.marc260Data = marc260Data;
    }

    public String getMarc260Editora() {
        return marc260Editora;
    }

    public void setMarc260Editora(String marc260Editora) {
        this.marc260Editora = marc260Editora;
    }

    public int getMarc260Data() {
        return marc260Data;
    }

    public void setMarc260Data(int marc260Data) {
        this.marc260Data = marc260Data;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMarc260Distribuicao() {
        return marc260Editora + " - " + marc260Data;
    }
}
