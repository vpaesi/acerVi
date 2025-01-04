package com.acervi.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.acervi.backend.model.Livro;
import com.acervi.backend.repository.LivroRepository;

@Service
public class LivroService {

    private final LivroRepository livroRepository;

    @Autowired
    public LivroService(LivroRepository livroRepository) {
        this.livroRepository = livroRepository;
    }

    public Livro criarLivro(Livro livro) {
        // Lógica adicional, como validações, associações...
        throw new UnsupportedOperationException("Unimplemented method 'criarLivro'");
    }

    public Livro buscarLivro(Long id) {
        return livroRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Livro não encontrado"));
    }

    public Livro editarLivro(Long id, Livro dadosEditados) {
        throw new UnsupportedOperationException("Unimplemented method 'editarLivro'");
    }

    public List<Livro> listarLivros() {
        throw new UnsupportedOperationException("Unimplemented method 'listarLivros'");
    }

    public void excluirLivro(Long id) {
        throw new UnsupportedOperationException("Unimplemented method 'excluirLivro'");
    }
    
}
