package com.acervi.backend.dto;

import java.util.List;

import com.acervi.backend.model.CDU;

public class LivroDTO {

    private Long id;
    private String tituloPrincipal;
    private Long cduId;
    private String cduCodigo;
    private String cduDescricao;
    private String cutterCodigo;
    private List<String> entradaPrincipal;
    private List<String> assuntoTopico;

    private String descricaoFisica;
    private String distribuicao;
    private String edicao;
    private String serieRelacionada;
    private String assuntoPessoa;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTituloPrincipal() {
        return tituloPrincipal;
    }

    public void setTituloPrincipal(String tituloPrincipal) {
        this.tituloPrincipal = tituloPrincipal;
    }

    public Long getCduId() {
        return cduId;
    }

    public void setCduId(Long cduId) {
        this.cduId = cduId;
    }

    public String getCduCodigo() {
        return cduCodigo;
    }

    public void setCduCodigo(String cduCodigo) {
        this.cduCodigo = cduCodigo;
    }

    public String getCduDescricao() {
        return cduDescricao;
    }

    public void setCduDescricao(String cduDescricao) {
        this.cduDescricao = cduDescricao;
    }

    public void setCdu(CDU cdu) {
        if (cdu != null) {
            this.cduId = cdu.getId();
            this.cduCodigo = cdu.getCodigo();
            this.cduDescricao = cdu.getDescricao();
        }
    }

    public String getCutterCodigo() {
        return cutterCodigo;
    }

    public void setCutterCodigo(String cutterCodigo) {
        this.cutterCodigo = cutterCodigo;
    }

    public List<String> getEntradaPrincipal() {
        return entradaPrincipal;
    }

    public void setEntradaPrincipal(List<String> entradaPrincipal) {
        this.entradaPrincipal = entradaPrincipal;
    }

    public List<String> getAssuntoTopico() {
        return assuntoTopico;
    }

    public void setAssuntoTopico(List<String> assuntoTopico) {
        this.assuntoTopico = assuntoTopico;
    }

    public String getDescricaoFisica() {
        return descricaoFisica;
    }

    public void setDescricaoFisica(String descricaoFisica) {
        this.descricaoFisica = descricaoFisica;
    }

    public String getDistribuicao() {
        return distribuicao;
    }

    public void setDistribuicao(String distribuicao) {
        this.distribuicao = distribuicao;
    }

    public String getEdicao() {
        return edicao;
    }

    public void setEdicao(String edicao) {
        this.edicao = edicao;
    }

    public String getSerieRelacionada() {
        return serieRelacionada;
    }

    public void setSerieRelacionada(String serieRelacionada) {
        this.serieRelacionada = serieRelacionada;
    }

    public String getAssuntoPessoa() {
        return assuntoPessoa;
    }

    public void setAssuntoPessoa(String assuntoPessoa) {
        this.assuntoPessoa = assuntoPessoa;
    }
}
