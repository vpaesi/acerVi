package com.acervi.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
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
public class CDU080 {
    @JsonProperty("cdu")
    @Column(nullable = false)
    private String aCodigo;

    @JsonProperty("cdu_descricao")
    @Column(nullable = false)
    private String descricao;
}

