package com.acervi.backend.service;

import com.acervi.backend.dto.LivroDTO;
import com.acervi.backend.mapper.LivroMapper;
import com.acervi.backend.model.Livro;
import com.acervi.backend.repository.LivroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
public class LivroService {

    @Autowired
    private LivroRepository livroRepository;

    @Autowired
    private LivroMapper livroMapper;

    public LivroDTO salvarLivro(LivroDTO dto) {
        // validações podem ser feitas aqui

        Livro livro = livroMapper.toEntity(dto);
        Livro salvo = livroRepository.save(livro);
        return livroMapper.toDTO(salvo);
    }

    public LivroDTO buscarPorCutter(String cutter) {
        Livro livro = livroRepository.findById(cutter)
                .orElseThrow(() -> new NoSuchElementException("Livro não encontrado para cutter: " + cutter));
        return livroMapper.toDTO(livro);
    }

    public List<LivroDTO> listarTodos() {
        List<Livro> livros = livroRepository.findAll();
        return livros.stream()
                .map(livroMapper::toDTO)
                .collect(Collectors.toList());
    }

    public void excluirPorCutter(String cutter) {
        livroRepository.deleteById(cutter);
    }
}
