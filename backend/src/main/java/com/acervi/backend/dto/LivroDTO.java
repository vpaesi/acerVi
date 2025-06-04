package com.acervi.backend.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LivroDTO {

    @JsonProperty("cutter")
    private String cutter;

    @JsonProperty("cdu_080")
    private CduDTO cdu080;

    @JsonProperty("entradaPrincipal_1xx")
    private EntradaPrincipalSet entradaPrincipal1xx;

    @JsonProperty("tituloPrincipal_245")
    private String tituloPrincipal245;

    @JsonProperty("edicao_25x_28x")
    private EdicaoDTO edicao;

    @JsonProperty("extencao_300a")
    private String extencao300a;

    @JsonProperty("assuntoTopico_650a")
    private List<String> assuntoTopico650a;

    @JsonProperty("capa")
    private String capa;

    @JsonProperty("entradaSecundaria_7xx")
    private EntradaSecundariaSet entradaSecundaria7xx;

    @JsonProperty("serieRelacionada_490")
    private String serieRelacionada_490;

    @JsonProperty("entradaSecundariaSerie_830")
    private String entradaSecundariaSerie_830;
}
