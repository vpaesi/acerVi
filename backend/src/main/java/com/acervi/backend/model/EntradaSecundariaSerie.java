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
public class EntradaSecundariaSerie {

    @OneToMany(mappedBy = "entradaSecundariaSerie", cascade = CascadeType.ALL)
    private List<Livro> livros = new ArrayList<>();

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String marc800TituloSerieColecao;
    private int marc800Volume;

    public EntradaSecundariaSerie() {}

    public EntradaSecundariaSerie(
        Long id, 
        String marc800TituloSerieColecao, 
        int marc800Volume) 
        {
        this.id = id;
        this.marc800TituloSerieColecao = marc800TituloSerieColecao;
        this.marc800Volume = marc800Volume;
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getMarc800TituloSerieColecao() {
        return marc800TituloSerieColecao;
    }
    public void setMarc800TituloSerieColecao(String marc800TituloSerieColecao) {
        this.marc800TituloSerieColecao = marc800TituloSerieColecao;
    }
    public int getMarc800Volume() {
        return marc800Volume;
    }
    public void setMarc800Volume(int marc800Volume) {
        this.marc800Volume = marc800Volume;
    }
    public List<Livro> getLivros() {
        return livros;
    }
    public void setLivros(List<Livro> livros) {
        this.livros = livros;
    }
    public String getMarc490SerieRelacionada() {
        return marc800TituloSerieColecao + " - Volume " + marc800Volume;
    }

    public EntradaSecundariaSerie get(int i) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'get'");
    }
}
