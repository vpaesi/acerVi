package com.acervi.backend.model;

import jakarta.persistence.Entity;

@Entity
public class Cutter {

    private String codigo;

    public String getCodigo() {
        return codigo;
    }
    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }
}
