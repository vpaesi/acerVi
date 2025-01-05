package com.acervi.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class EntradaPrincipal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "livro_id")
    private Livro livro;

    private String marc100NomePessoalEntidadeEventoTitulo;
    private String marc110EditidadeUnidadeSubordinada;
    private String marc111EventoNumero;
    private String marc111EventoData;

    public String getMarc100NomePessoalEntidadeEventoTitulo() {
        return marc100NomePessoalEntidadeEventoTitulo;
    }

    public void setMarc100NomePessoalEntidadeEventoTitulo(String marc100NomePessoalEntidadeEventoTitulo) {
        this.marc100NomePessoalEntidadeEventoTitulo = marc100NomePessoalEntidadeEventoTitulo;
    }

    public String getMarc110EditidadeUnidadeSubordinada() {
        return marc110EditidadeUnidadeSubordinada;
    }

    public void setMarc110EditidadeUnidadeSubordinada(String marc110EditidadeUnidadeSubordinada) {
        this.marc110EditidadeUnidadeSubordinada = marc110EditidadeUnidadeSubordinada;
    }

    public String getMarc111EventoNumero() {
        return marc111EventoNumero;
    }

    public void setMarc111EventoNumero(String marc111EventoNumero) {
        this.marc111EventoNumero = marc111EventoNumero;
    }

    public String getMarc111EventoData() {
        return marc111EventoData;
    }

    public void setMarc111EventoData(String marc111EventoData) {
        this.marc111EventoData = marc111EventoData;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}