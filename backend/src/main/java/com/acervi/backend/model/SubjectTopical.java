package com.acervi.backend.model;

public enum SubjectTopical {
    DESENVOLVIMENTO_PESSOAL,
    FANTASIA,
    FICCAO,
    FICCAO_CIENTIFICA,
    FICCAO_INFANTO_JUVENIL,
    ROMANCE,
    SUSPENSE_MISTERIO;

    private String marc650SubjectTopical;

    public String getMarc650SubjectTopical() {
        return marc650SubjectTopical;
    }

    public void setMarc650SubjectTopical(String marc650SubjectTopical) {
        this.marc650SubjectTopical = marc650SubjectTopical;
    }

    public static boolean isValid(String value){
        for(SubjectTopical subjectTopical : SubjectTopical.values()){
            if(subjectTopical.name().equals(value)){
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
