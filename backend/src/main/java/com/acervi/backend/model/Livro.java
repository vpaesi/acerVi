package com.acervi.backend.model;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Livro {

    @Id
    private String cutter; 

    @Embedded
    private Cdu cdu080;

    @Embedded
    private EntradaPrincipalSet entradaPrincipal1xx;

    private String tituloPrincipal245;

    @Embedded
    private Edicao edicao;

    private String extencao300a;

    @ElementCollection
    private List<String> assuntoTopico650a;

    private String capa;

    @Embedded
    private EntradaSecundariaSet entradaSecundaria7xx;

    // Novos campos independentes para séries 490 e 830
    private String serie490;

    private String serie830;

    @Embeddable
    @Getter
    @Setter
    public static class Cdu {
        @Column(name = "cdu")
        private String aCodigo;

        @Column(name = "cdu_descricao")
        private String descricao;
    }

    @Embeddable
    @Getter
    @Setter
    public static class EntradaPrincipalSet {
        private String nomePessoal100;
        private String nomeEntidade110;
        private String nomeEvento111;
        private String tituloUniforme130;
    }

    @Embeddable
    @Getter
    @Setter
    public static class Edicao {
        private String edicao250;
        private String local260a;
        private String editora260b;
        private String data260c;
    }

    @Embeddable
    @Getter
    @Setter
    public static class EntradaSecundariaSet {
        @ElementCollection
        private List<String> nomePessoal700;

        private String nomeEntidade710;
        private String nomeEvento711;
        private String tituloUniforme730;

        // Removido entradaSecundariaSerie830 daqui
    }
}
