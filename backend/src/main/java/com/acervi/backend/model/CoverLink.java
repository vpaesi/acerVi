package com.acervi.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class CoverLink {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String marc856CoverLink;

    public CoverLink() {}

    public CoverLink(String marc856CoverLink) {
        this.marc856CoverLink = marc856CoverLink;
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
   
    public String getMarc856CoverLink() {
        return marc856CoverLink;
    }
    public void setMarc856CoverLink(String marc856CoverLink) {
        this.marc856CoverLink = marc856CoverLink;
    }

}
