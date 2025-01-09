package com.acervi.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class LinkImagem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String marc856LinkImagem;

    public LinkImagem() {}

    public LinkImagem(String marc856LinkImagem) {
        this.marc856LinkImagem = marc856LinkImagem;
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
   
    public String getMarc856LinkImagem() {
        return marc856LinkImagem;
    }
    public void setMarc856LinkImagem(String marc856LinkImagem) {
        this.marc856LinkImagem = marc856LinkImagem;
    }

    public void setMarc856EnderecoEletronico(String string) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setMarc856EnderecoEletronico'");
    }

}
