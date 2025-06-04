package com.acervi.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EntradaPrincipalSet {
    @JsonProperty("nomePessoal_100")
    private String nomePessoal100;

    @JsonProperty("nomeEntidade_110")
    private String nomeEntidade110;

    @JsonProperty("nomeEvento_111")
    private String nomeEvento111;

    @JsonProperty("tituloUniforme_130")
    private String tituloUniforme130;
}

