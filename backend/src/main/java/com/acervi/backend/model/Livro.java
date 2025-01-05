package com.acervi.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import java.util.*;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class Livro {

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

    @OneToMany(mappedBy = "livro", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<EntradaPrincipal> entradaPrincipal = new ArrayList<>();

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "tituloPrincipal_id")
    private TituloPrincipal tituloPrincipal;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "edicao_id")
    private Edicao edicao;

    @NotNull
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "distribuicao_id")
    private Distribuicao distribuicao;

    @NotNull
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "descricaoFisica_id")
    private DescricaoFisica descricaoFisica;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "serieRelacionada_id")
    private SerieRelacionada serieRelacionada;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "assuntoPessoa_id")
    private AssuntoPessoa assuntoPessoa;

    @ElementCollection(targetClass = AssuntoTopico.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "livro_assunto_topico", joinColumns = @JoinColumn(name = "livro_id"))
    @Column(name = "assunto_topico")
    @Enumerated(EnumType.STRING)
    private List<AssuntoTopico> assuntoTopico = new ArrayList<>();

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
        name = "livro_entradaSecundaria",
        joinColumns = @JoinColumn(name = "livro_id"),
        inverseJoinColumns = @JoinColumn(name = "entradaSecundaria_id")
    )
    private List<EntradaSecundaria> entradaSecundaria = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "entradaSecundariaSerie_id")
    private EntradaSecundariaSerie entradaSecundariaSerie;

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

    public List<EntradaPrincipal> getEntradaPrincipal() {
        return entradaPrincipal;
    }

    public void setEntradaPrincipal(List<EntradaPrincipal> entradaPrincipal) {
        this.entradaPrincipal = entradaPrincipal;
    }

    public TituloPrincipal getTituloPrincipal() {
        return tituloPrincipal;
    }

    public void setTituloPrincipal(TituloPrincipal tituloPrincipal) {
        this.tituloPrincipal = tituloPrincipal;
    }

    public Edicao getEdicao() {
        return edicao;
    }

    public void setEdicao(Edicao edicao) {
        this.edicao = edicao;
    }

    public Distribuicao getDistribuicao() {
        return distribuicao;
    }

    public void setDistribuicao(Distribuicao distribuicao) {
        this.distribuicao = distribuicao;
    }

    public DescricaoFisica getDescricaoFisica() {
        return descricaoFisica;
    }

    public void setDescricaoFisica(DescricaoFisica descricaoFisica) {
        this.descricaoFisica = descricaoFisica;
    }

    public SerieRelacionada getSerieRelacionada() {
        return serieRelacionada;
    }

    public void setSerieRelacionada(SerieRelacionada serieRelacionada) {
        this.serieRelacionada = serieRelacionada;
    }

    public AssuntoPessoa getAssuntoPessoa() {
        return assuntoPessoa;
    }

    public void setAssuntoPessoa(AssuntoPessoa assuntoPessoa) {
        this.assuntoPessoa = assuntoPessoa;
    }

    public List<AssuntoTopico> getAssuntoTopico() {
        return assuntoTopico;
    }

    public void setAssuntoTopico(List<AssuntoTopico> assuntoTopico) {
        this.assuntoTopico = assuntoTopico;
    }

    public List<EntradaSecundaria> getEntradaSecundaria() {
        return entradaSecundaria;
    }

    public void setEntradaSecundaria(List<EntradaSecundaria> entradaSecundaria) {
        this.entradaSecundaria = entradaSecundaria;
    }

    public EntradaSecundariaSerie getEntradaSecundariaSerie() {
        return entradaSecundariaSerie;
    }

    public void setEntradaSecundariaSerie(EntradaSecundariaSerie entradaSecundariaSerie) {
        this.entradaSecundariaSerie = entradaSecundariaSerie;
    }
}