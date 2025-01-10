package com.acervi.backend.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class EntryAddedSerie {

    @OneToMany(mappedBy = "entryAddedSerie", cascade = CascadeType.ALL)
    private List<Book> books = new ArrayList<>();

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String marc800TitleCollectionSeries;
    private int marc800Volume;

    public EntryAddedSerie() {}

    public EntryAddedSerie(
        Long id, 
        String marc800TitleCollectionSeries, 
        int marc800Volume) 
        {
        this.id = id;
        this.marc800TitleCollectionSeries = marc800TitleCollectionSeries;
        this.marc800Volume = marc800Volume;
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getMarc800TitleCollectionSeries() {
        return marc800TitleCollectionSeries;
    }
    public void setMarc800TitleCollectionSeries(String marc800TitleCollectionSeries) {
        this.marc800TitleCollectionSeries = marc800TitleCollectionSeries;
    }
    public int getMarc800Volume() {
        return marc800Volume;
    }
    public void setMarc800Volume(int marc800Volume) {
        this.marc800Volume = marc800Volume;
    }
    public List<Book> getBooks() {
        return books;
    }
    public void setBooks(List<Book> books) {
        this.books = books;
    }
    public String getMarc490SeriesStatement() {
        return marc800TitleCollectionSeries + " - Volume " + marc800Volume;
    }

    public EntryAddedSerie get(int i) {
        throw new UnsupportedOperationException("Unimplemented method 'get'");
    }
}
