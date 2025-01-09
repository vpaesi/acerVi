package com.acervi.backend.model;

public enum AssuntoTopico {
    DESENVOLVIMENTO_PESSOAL,
    FANTASIA,
    FICCAO,
    FICCAO_CIENTIFICA,
    FICCAO_INFANTO_JUVENIL,
    ROMANCE,
    SUSPENSE_MISTERIO;

    private String marc650AssuntoTopico;

    public String getMarc650AssuntoTopico() {
        return marc650AssuntoTopico;
    }

    public void setMarc650AssuntoTopico(String marc650AssuntoTopico) {
        this.marc650AssuntoTopico = marc650AssuntoTopico;
    }

    public static boolean isValid(String value){
        for(AssuntoTopico assuntoTopico : AssuntoTopico.values()){
            if(assuntoTopico.name().equals(value)){
                return true;
            }
        }
        return false;
    }
    
    public boolean isDesenvolvimentoPessoal(){
        return this == DESENVOLVIMENTO_PESSOAL;
    }

    public boolean isFantasia(){
        return this == FANTASIA;
    }

    public boolean isFiccao(){
        return this == FICCAO;
    }

    public boolean isFiccaoCientifica(){
        return this == FICCAO_CIENTIFICA;
    }

    public boolean isFiccaoInfantoJuvenil(){
        return this == FICCAO_INFANTO_JUVENIL;
    }

    public boolean isRomance(){
        return this == ROMANCE;
    }

    public boolean isSuspenseMisterio(){
        return this == SUSPENSE_MISTERIO;
    }
}
