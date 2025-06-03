package com.acervi.backend.model;

import com.acervi.backend.EntradaPrincipal;
import com.acervi.backend.EntradaSecundaria;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Livro {

    @Id
    @Column(name = "cdu", nullable = false, unique = true)
    private String cdu; // Identificador principal

    private String titulo;
    private String subtitulo;
    private String cutter; // Código de ordenação

    @Enumerated(EnumType.STRING)
    private EntradaPrincipal entradaPrincipal;

    @Enumerated(EnumType.STRING)
    private EntradaSecundaria entradaSecundaria;

    private String autorPrincipal;     // Nome ou entidade
    private String autoresSecundarios; // Lista como string ou mapear como entidade depois

    private String editora;
    private String anoPublicacao;
    private String isbn;
    private String idioma;
    private String genero;
    private int numeroPaginas;
    private String sinopse;
    private String capaUrl; // link para imagem
    public Object getTipoEntradaPrincipal() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getTipoEntradaPrincipal'");
    }
    public Object getTipoEntradaSecundaria() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getTipoEntradaSecundaria'");
    }
}
