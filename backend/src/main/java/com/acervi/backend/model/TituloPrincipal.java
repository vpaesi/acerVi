package com.acervi.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class TituloPrincipal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String marc245TituloPrincipal;
    private String marc245Subtitulo;

    public TituloPrincipal() {}

    public TituloPrincipal(String marc245TituloPrincipal, String marc245Subtitulo) {
        this.marc245TituloPrincipal = marc245TituloPrincipal;
        this.marc245Subtitulo = marc245Subtitulo;
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
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
