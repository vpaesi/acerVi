package com.acervi.backend.model;

import jakarta.persistence.Entity;

@Entity
public class Distribuicao {

    private String marc260Editora;
    private String marc260Data;

    public String getMarc260Editora() {
        return marc260Editora;
    }
    public void setMarc260Editora(String marc260Editora) {
        this.marc260Editora = marc260Editora;
    }
    public String getMarc260Data() {
        return marc260Data;
    }
    public void setMarc260Data(String marc260Data) {
        this.marc260Data = marc260Data;
    }
}
