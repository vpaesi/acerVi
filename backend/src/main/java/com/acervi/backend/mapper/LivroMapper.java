package com.acervi.backend.mapper;

import com.acervi.backend.dto.LivroDTO;

import com.acervi.backend.model.Livro;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface LivroMapper {

    Livro toEntity(LivroDTO dto);

    LivroDTO toDTO(Livro entity);
}
