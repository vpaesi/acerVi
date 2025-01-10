package com.acervi.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class SeriesStatement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String marc490TitleCollectionSeries;
    private int marc490Volume;

    public SeriesStatement() {}

    public SeriesStatement(Long id, String marc490TitleCollectionSeries, int marc490Volume) {
        this.id = id;
        this.marc490TitleCollectionSeries = marc490TitleCollectionSeries;
        this.marc490Volume = marc490Volume;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMarc490TitleCollectionSeries() {
        return marc490TitleCollectionSeries;
    }

    public void setMarc490TitleCollectionSeries(String marc490TitleCollectionSeries) {
        this.marc490TitleCollectionSeries = marc490TitleCollectionSeries;
    }

    public int getMarc490Volume() {
        return marc490Volume;
    }

    public void setMarc490Volume(int marc490Volume) {
        this.marc490Volume = marc490Volume;
    }

    public String getMarc490SeriesStatement() {
        return marc490TitleCollectionSeries + " - Volume " + marc490Volume;
    }
}
