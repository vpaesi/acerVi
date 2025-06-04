package com.acervi.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Edicao_25x_28x {
    @JsonProperty("edicao_250")
    private String edicao250;

    @JsonProperty("local_260a")
    private String local260a;

    @JsonProperty("editora_260b")
    private String editora260b;

    @JsonProperty("data_260c")
    private String data260c;
}

