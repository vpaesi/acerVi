package com.acervi.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class EntryAdded {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String marc700PersonalCorporate;

    public EntryAdded() {}

    public EntryAdded(
        String marc700PersonalCorporate){
        this.marc700PersonalCorporate = marc700PersonalCorporate;       
        }

    public String getMarc700PersonalCorporate() {
        return marc700PersonalCorporate;
    }
    public void setMarc700PersonalCorporate(String marc700PersonalCorporate) {
        this.marc700PersonalCorporate = marc700PersonalCorporate;
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
}
