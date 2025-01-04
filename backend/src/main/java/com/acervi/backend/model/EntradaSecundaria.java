package com.acervi.backend.model;

import jakarta.persistence.Entity;

@Entity
public class EntradaSecundaria {

    private String marc700NomePessoalEntidade;
    private String marc700OrgEdCordComp;
    private String marc710EntidadeUnidadeSubordinada;

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
}
