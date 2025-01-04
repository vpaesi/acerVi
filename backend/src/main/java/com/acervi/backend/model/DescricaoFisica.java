package com.acervi.backend.model;

import jakarta.persistence.Entity;

@Entity
public class DescricaoFisica {

    @jakarta.persistence.Id
    @jakarta.persistence.GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id;

    private String marc300Páginas;

    private int marc300Volumes;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMarc300Páginas() {
        return marc300Páginas;
    }

    public void setMarc300Páginas(String marc300Páginas) {
        this.marc300Páginas = marc300Páginas;
    }

    public int getMarc300Volumes() {
        return marc300Volumes;
    }

    public void setMarc300Volumes(int marc300Volumes) {
        this.marc300Volumes = marc300Volumes;
    }

    
}
