package com.acervi.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class EntradaSecundaria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String marc700NomePessoalEntidade;
    private String marc700OrgEdCordComp;
    private String marc710EntidadeUnidadeSubordinada;

    public EntradaSecundaria() {}

    public EntradaSecundaria(
        String marc700NomePessoalEntidade, 
        String marc700OrgEdCordComp, 
        String marc710EntidadeUnidadeSubordinada) 
        {
        this.marc700NomePessoalEntidade = marc700NomePessoalEntidade;
        this.marc700OrgEdCordComp = marc700OrgEdCordComp;
        this.marc710EntidadeUnidadeSubordinada = marc710EntidadeUnidadeSubordinada;
    }

    public String getMarc700NomePessoalEntidade() {
        return marc700NomePessoalEntidade;
    }
    public void setMarc700NomePessoalEntidade(String marc700NomePessoalEntidade) {
        this.marc700NomePessoalEntidade = marc700NomePessoalEntidade;
    }
    public String getMarc700OrgEdCordComp() {
        return marc700OrgEdCordComp;
    }
    public void setMarc700OrgEdCordComp(String marc700OrgEdCordComp) {
        this.marc700OrgEdCordComp = marc700OrgEdCordComp;
    }
    public String getMarc710EntidadeUnidadeSubordinada() {
        return marc710EntidadeUnidadeSubordinada;
    }
    public void setMarc710EntidadeUnidadeSubordinada(String marc710EntidadeUnidadeSubordinada) {
        this.marc710EntidadeUnidadeSubordinada = marc710EntidadeUnidadeSubordinada;
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
}
