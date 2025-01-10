package com.acervi.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Publication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String marc260Publisher;
    private int marc260Date;

    public Publication() {}

    public Publication(Long id, String marc260Publisher, int marc260Date) {
        this.id = id;
        this.marc260Publisher = marc260Publisher;
        this.marc260Date = marc260Date;
    }

    public Publication(String marc260Publisher, int marc260Date) {
        this.marc260Publisher = marc260Publisher;
        this.marc260Date = marc260Date;
    }

    public String getMarc260Publisher() {
        return marc260Publisher;
    }

    public void setMarc260Publisher(String marc260Publisher) {
        this.marc260Publisher = marc260Publisher;
    }

    public int getMarc260Date() {
        return marc260Date;
    }

    public void setMarc260Date(int marc260Date) {
        this.marc260Date = marc260Date;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMarc260Publication() {
        return marc260Publisher + " - " + marc260Date;
    }
}
