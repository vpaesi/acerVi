package com.acervi.backend;

public enum EntradaSecundaria {
    ENTRADA_700("Nome pessoal"),
    ENTRADA_710("Entidade coletiva"),
    ENTRADA_711("Evento"),
    ENTRADA_730("Título uniforme"),
    ENTRADA_740("Título não controlado adicional"),
    ENTRADA_830("Série – título uniforme");

    private final String descricao;
    EntradaSecundaria(String descricao) { this.descricao = descricao; }
    public String getDescricao() { return descricao; }
}
