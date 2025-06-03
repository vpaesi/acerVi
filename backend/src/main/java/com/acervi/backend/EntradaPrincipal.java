package com.acervi.backend;

public enum EntradaPrincipal {
    ENTRADA_100("Nome pessoal"),
    ENTRADA_110("Entidade"),
    ENTRADA_111("Evento"),
    ENTRADA_130("Título uniforme");

    private final String descricao;
    EntradaPrincipal(String descricao) { this.descricao = descricao; }
    public String getDescricao() { return descricao; }
}
