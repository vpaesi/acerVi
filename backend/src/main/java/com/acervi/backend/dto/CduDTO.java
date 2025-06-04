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
public class CduDTO {
    @JsonProperty("cdu")
    private String aCodigo;

    @JsonProperty("cdu_descricao")
    private String descricao;
}

