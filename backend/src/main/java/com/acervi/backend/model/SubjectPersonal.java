package com.acervi.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class SubjectPersonal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
        private String marc650SubjectPersonal;
    
        public SubjectPersonal() {}
        
        public SubjectPersonal(String marc650SubjectPersonal) {
            this.marc650SubjectPersonal = marc650SubjectPersonal;
    }
    
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getmarc650SubjectPersonal() {
        return marc650SubjectPersonal;
    }
    public void setmarc650SubjectPersonal(String marc650SubjectPersonal) {
        this.marc650SubjectPersonal = marc650SubjectPersonal;
    }
}
