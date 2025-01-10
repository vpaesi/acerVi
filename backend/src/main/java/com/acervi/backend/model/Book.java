package com.acervi.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import java.util.*;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "cdu_id")
    private CDU cdu;

    @NotNull
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "cutter_id")
    private Cutter cutter;

    @NotNull
    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<EntryMain> entryMain = new ArrayList<>();

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "titleMain_id")
    private TitleMain titleMain;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "edition_id")
    private Edition edition;

    @NotNull
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "publication_id")
    private Publication publication;

    @NotNull
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "physicaldescription_id")
    private PhysicalDescription physicalDescription;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "seriesStatement_id")
    private SeriesStatement seriesStatement;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "subjectPersonal_id")
    private SubjectPersonal subjectPersonal;

    @NotNull
    @ElementCollection(targetClass = SubjectTopical.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "book_subject_topical", joinColumns = @JoinColumn(name = "book_id"))
    @Column(name = "subject_topical")
    @Enumerated(EnumType.STRING)
    private List<SubjectTopical> subjectTopical = new ArrayList<>();

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
        name = "book_entryAdded",
        joinColumns = @JoinColumn(name = "book_id"),
        inverseJoinColumns = @JoinColumn(name = "entryAdded_id")
    )
    private List<EntryAdded> entryAdded = new ArrayList<>();

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "coverLink_id")
    private CoverLink coverLink;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "entryAddedSerie_id")
    private EntryAddedSerie entryAddedSerie;

    public Book() {}

    public Book(
        CDU cdu, 
        Cutter cutter, 
        List<EntryMain> entryMain, 
        TitleMain titleMain, 
        Edition edition, 
        Publication publication, 
        PhysicalDescription physicalDescription, 
        SeriesStatement seriesStatement,
        SubjectPersonal subjectPersonal,
        List<SubjectTopical> subjectTopical,
        List<EntryAdded> entryAdded,
        EntryAddedSerie entryAddedSerie,
        CoverLink coverLink) 
        {
        this.cdu = cdu;
        this.cutter = cutter;
        this.entryMain = entryMain;
        this.titleMain = titleMain;
        this.edition = edition;
        this.publication = publication;
        this.physicalDescription = physicalDescription;
        this.seriesStatement = seriesStatement;
        this.subjectPersonal = subjectPersonal;
        this.subjectTopical = subjectTopical;
        this.entryAdded = entryAdded;
        this.entryAddedSerie = entryAddedSerie;
        this.coverLink = coverLink;
    }            

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CDU getCdu() {
        return cdu;
    }

    public void setCdu(CDU cdu) {
        this.cdu = cdu;
    }   
    
    public Cutter getCutter() {
        return cutter;
    }

    public void setCutter(Cutter cutter) {
        this.cutter = cutter;
    }

    public List<EntryMain> getEntryMain() {
        return entryMain;
    }

    public void setEntryMain(List<EntryMain> entryMain) {
        this.entryMain = entryMain;
    }

    public TitleMain getTitleMain() {
        return titleMain;
    }

    public void setTitleMain(TitleMain titleMain) {
        this.titleMain = titleMain;
    }

    public Edition getEdition() {
        return edition;
    }

    public void setEdition(Edition edition) {
        this.edition = edition;
    }

    public Publication getPublication() {
        return publication;
    }

    public void setPublication(Publication publication) {
        this.publication = publication;
    }

    public PhysicalDescription getPhysicalDescription() {
        return physicalDescription;
    }

    public void setPhysicalDescription(PhysicalDescription physicalDescription) {
        this.physicalDescription = physicalDescription;
    }

    public SeriesStatement getSeriesStatement() {
        return seriesStatement;
    }

    public void setSeriesStatement(SeriesStatement seriesStatement) {
        this.seriesStatement = seriesStatement;
    }

    public SubjectPersonal getSubjectPersonal() {
        return subjectPersonal;
    }

    public void setSubjectPersonal(SubjectPersonal subjectPersonal) {
        this.subjectPersonal = subjectPersonal;
    }

    public List<SubjectTopical> getSubjectTopical() {
        return subjectTopical;
    }

    public void setSubjectTopical(List<SubjectTopical> subjectTopical) {
        this.subjectTopical = subjectTopical;
    }

    public List<EntryAdded> getEntryAdded() {
        return entryAdded;
    }

    public void setEntryAdded(List<EntryAdded> entryAdded) {
        this.entryAdded = entryAdded;
    }

    public EntryAddedSerie getEntryAddedSerie() {
        return entryAddedSerie;
    }

    public void setEntryAddedSerie(EntryAddedSerie entryAddedSerie) {
        this.entryAddedSerie = entryAddedSerie;
    }

    public CoverLink getCoverLink() {
        return coverLink;
    }
    
    public void setCoverLink(CoverLink coverLink) {
        this.coverLink = coverLink;
    }
}