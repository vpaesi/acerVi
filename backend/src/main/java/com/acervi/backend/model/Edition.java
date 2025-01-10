package com.acervi.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Edition {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String marc250numberEditionStatemen;

    private String marc250Edition;

    public Edition() {}

    public Edition(Long id, String marc250numberEditionStatemen) {
        this.id = id;
        this.marc250numberEditionStatemen = marc250numberEditionStatemen;
    }

    public String getMarc250Edition() {
        return marc250Edition;
    }

    public void setMarc250Edition(String marc250Edition) {
        this.marc250Edition = marc250Edition;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMarc250numberEditionStatemen() {
        return marc250numberEditionStatemen;
    }

    public void setMarc250numberEditionStatemen(String marc250numberEditionStatemen) {
        this.marc250numberEditionStatemen = marc250numberEditionStatemen;
    }
}
