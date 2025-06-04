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
public class EdicaoDTO {
    @JsonProperty("edicao_250")
    private String edicao250;

    @JsonProperty("local_260a")
    private String local260a;

    @JsonProperty("editora_260b")
    private String editora260b;

    @JsonProperty("data_260c")
    private String data260c;
}

