package com.acervi.backend.model;

import jakarta.persistence.Entity;

@Entity
public class TituloPrincipal {

    private String marc245TituloPrincipal;
    private String marc245Subtitulo;

    public String getMarc245TituloPrincipal() {
        return marc245TituloPrincipal;
    }
    public void setMarc245TituloPrincipal(String marc245TituloPrincipal) {
        this.marc245TituloPrincipal = marc245TituloPrincipal;
    }
    public String getMarc245Subtitulo() {
        return marc245Subtitulo;
    }
    public void setMarc245Subtitulo(String marc245Subtitulo) {
        this.marc245Subtitulo = marc245Subtitulo;
    }
}
