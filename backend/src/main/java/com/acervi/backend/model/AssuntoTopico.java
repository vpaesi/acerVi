package com.acervi.backend.model;

public enum AssuntoTopico {
    DESENVOLVIMENTO_PESSOAL,
    DRAMA,
    FANTASIA,
    FICCAO_CIENTIFICA,
    FICCAO_INFANTO_JUVENIL,
    ROMANCE,
    ROMANCE_NARRATIVO,
    SUSPENSE_MISTERIO;

    public boolean isDesenvolvimentoPessoal(){
        return this == DESENVOLVIMENTO_PESSOAL;
    }

    public boolean isDrama(){
        return this == DRAMA;
    }

    public boolean isFantasia(){
        return this == FANTASIA;
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

    public boolean isRomanceNarrativo(){
        return this == ROMANCE_NARRATIVO;
    }

    public boolean isSuspenseMisterio(){
        return this == SUSPENSE_MISTERIO;
    }
}
