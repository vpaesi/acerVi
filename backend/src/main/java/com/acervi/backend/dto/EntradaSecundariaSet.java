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
public class EntradaSecundariaSet {

    @JsonProperty("nomePessoal_700")
    private List<String> nomePessoal700;

    @JsonProperty("nomeEntidade_710")
    private String nomeEntidade710;

    @JsonProperty("nomeEvento_711")
    private String nomeEvento711;

    @JsonProperty("tituloUniforme_730")
    private String tituloUniforme730;

}
