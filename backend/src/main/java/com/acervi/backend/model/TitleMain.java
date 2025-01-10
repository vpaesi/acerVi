package com.acervi.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class TitleMain {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String marc245TitleMain;
    private String marc245Subtitle;

    public TitleMain() {}

    public TitleMain(String marc245TitleMain, String marc245Subtitle) {
        this.marc245TitleMain = marc245TitleMain;
        this.marc245Subtitle = marc245Subtitle;
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getMarc245TitleMain() {
        return marc245TitleMain;
    }
    public void setMarc245TitleMain(String marc245TitleMain) {
        this.marc245TitleMain = marc245TitleMain;
    }
    public String getMarc245Subtitle() {
        return marc245Subtitle;
    }
    public void setMarc245Subtitle(String marc245Subtitle) {
        this.marc245Subtitle = marc245Subtitle;
    }

    
}
