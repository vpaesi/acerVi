package com.acervi.backend.mapper;

import com.acervi.backend.dto.LivroDTO;

import com.acervi.backend.model.Livro;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface LivroMapper {

    @Mappings({
        @Mapping(source = "serieRelacionada_490", target = "serieRelacionada_490"),
        @Mapping(source = "entradaSecundariaSerie_830", target = "entradaSecundariaSerie_830")
    })
    Livro toEntity(LivroDTO dto);

    LivroDTO toDTO(Livro entity);
}
