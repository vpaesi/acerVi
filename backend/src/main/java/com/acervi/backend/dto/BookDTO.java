package com.acervi.backend.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.acervi.backend.model.CDU;
import com.acervi.backend.model.Book;

public class BookDTO {
    private Long id;
    private String titleMain;
    private String subtitle;
    private Long cduId;
    private String cduCode;
    private String cduDescription;
    private String cutterCode;
    private List<String> entryMain;
    private List<String> subjectTopical;
    private String physicalDescription;
    private String publication;
    private String edition;
    private String seriesStatement;
    private String subjectPersonal;
    private String coverLink;

    //construtor com parâmetros
    public BookDTO(Book book) {
        this.id = book.getId();
        this.titleMain = book.getTitleMain() != null 
            ? book.getTitleMain().getMarc245TitleMain() 
            : null;
        this.subtitle = book.getTitleMain() != null 
            ? book.getTitleMain().getMarc245Subtitle() 
            : null;
        this.coverLink = book.getCoverLink() != null 
            ? book.getCoverLink().getMarc856CoverLink() 
            : null;
        this.entryMain = book.getEntryMain().stream()
            .map(ep -> ep.getMarc100PersonalCorporateMeeting())
            .collect(Collectors.toList());
        this.subjectTopical = book.getSubjectTopical().stream()
            .map(Enum::name)
            .collect(Collectors.toList());
    }

    //construtor sem parâmetros
    public BookDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitleMain() {
        return titleMain;
    }

    public void setTitleMain(String titleMain) {
        this.titleMain = titleMain;
    }

    public String getSubtitle() {
        return subtitle;
    }
    
    public void setSubtitle(String subtitle) {
        this.subtitle = subtitle;
    }

    public Long getCduId() {
        return cduId;
    }

    public void setCduId(Long cduId) {
        this.cduId = cduId;
    }

    public String getCduCode() {
        return cduCode;
    }

    public void setCduCode(String cduCode) {
        this.cduCode = cduCode;
    }

    public String getCduDescription() {
        return cduDescription;
    }

    public void setCduDescription(String cduDescription) {
        this.cduDescription = cduDescription;
    }

    public void setCdu(CDU cdu) {
        if (cdu != null) {
            this.cduId = cdu.getId();
            this.cduCode = cdu.getCode();
            this.cduDescription = cdu.getDescription();
        }
    }

    public String getCutterCode() {
        return cutterCode;
    }

    public void setCutterCode(String cutterCode) {
        this.cutterCode = cutterCode;
    }

    public List<String> getEntryMain() {
        return entryMain;
    }

    public void setEntryMain(List<String> entryMain) {
        this.entryMain = entryMain;
    }

    public List<String> getSubjectTopical() {
        return subjectTopical;
    }

    public void setSubjectTopical(List<String> subjectTopical) {
        this.subjectTopical = subjectTopical;
    }

    public String getPhysicalDescription() {
        return physicalDescription;
    }

    public void setPhysicalDescription(String physicalDescription) {
        this.physicalDescription = physicalDescription;
    }

    public String getPublication() {
        return publication;
    }

    public void setPublication(String publication) {
        this.publication = publication;
    }

    public String getEdition() {
        return edition;
    }

    public void setEdition(String edition) {
        this.edition = edition;
    }

    public String getSeriesStatement() {
        return seriesStatement;
    }

    public void setSeriesStatement(String seriesStatement) {
        this.seriesStatement = seriesStatement;
    }

    public String getSubjectPersonal() {
        return subjectPersonal;
    }

    public void setSubjectPersonal(String subjectPersonal) {
        this.subjectPersonal = subjectPersonal;
    }

    public String getCoverLink() {
        return coverLink;
    }

    public void setCoverLink(String coverLink) {
        this.coverLink = coverLink;
    }

}
