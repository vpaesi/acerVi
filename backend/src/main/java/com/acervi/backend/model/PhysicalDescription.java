package com.acervi.backend.model;

import jakarta.persistence.Entity;

@Entity
public class PhysicalDescription {

    @jakarta.persistence.Id
    @jakarta.persistence.GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id;
    private String marc300Pages;
    private int marc300Volumes;

    public PhysicalDescription() {}

    public PhysicalDescription(Long id, String marc300Pages, int marc300Volumes) {
        this.id = id;
        this.marc300Pages = marc300Pages;
        this.marc300Volumes = marc300Volumes;
    }

    public PhysicalDescription(String marc300Pages, int marc300Volumes) {
        this.marc300Pages = marc300Pages;
        this.marc300Volumes = marc300Volumes;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMarc300Pages() {
        return marc300Pages;
    }

    public void setMarc300Pages(String marc300Pages) {
        this.marc300Pages = marc300Pages;
    }

    public int getMarc300Volumes() {
        return marc300Volumes;
    }

    public void setMarc300Volumes(int marc300Volumes) {
        this.marc300Volumes = marc300Volumes;
    }

    public String getMarc300PhysicalDescription() {
        return marc300Pages + ", " + marc300Volumes + " volumes";
    }
}
