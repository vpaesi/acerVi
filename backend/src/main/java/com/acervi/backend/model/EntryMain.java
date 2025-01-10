package com.acervi.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class EntryMain {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "book_id")
    private Book book;
    private String marc100PersonalCorporateMeeting;
    private String marc110Corporate;
    private String marc111Metting;

    public EntryMain() {
    }

    public EntryMain(
        Book book, 
        String marc100PersonalCorporateMeeting, 
        String marc110Corporate, 
        String marc111Metting) 
        {
        this.book = book;
        this.marc100PersonalCorporateMeeting = marc100PersonalCorporateMeeting;
        this.marc110Corporate = marc110Corporate;
        this.marc111Metting = marc111Metting;
    }
    
    public String getMarc100PersonalCorporateMeeting() {
        return marc100PersonalCorporateMeeting;
    }

    public void setMarc100PersonalCorporateMeeting(String marc100PersonalCorporateMeeting) {
        this.marc100PersonalCorporateMeeting = marc100PersonalCorporateMeeting;
    }

    public String getMarc110Corporate() {
        return marc110Corporate;
    }

    public void setMarc110Corporate(String marc110Corporate) {
        this.marc110Corporate = marc110Corporate;
    }

    public String getMarc111Metting() {
        return marc111Metting;
    }

    public void setMarc111Metting(String marc111Metting) {
        this.marc111Metting = marc111Metting;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
    }
}