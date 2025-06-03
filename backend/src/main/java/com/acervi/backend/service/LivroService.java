package com.acervi.backend.service;

import com.acervi.backend.model.Livro;
import com.acervi.backend.repository.LivroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class LivroService {

    @Autowired
    private LivroRepository livroRepository;

    public Livro salvarLivro(Livro livro) {
        validarEntradas(livro);
        return livroRepository.save(livro);
    }

    public Livro buscarPorCdu(String cdu) {
        return livroRepository.findById(cdu).orElseThrow(() ->
            new NoSuchElementException("Livro com CDU " + cdu + " não encontrado."));
    }

    public List<Livro> listarTodos() {
        return livroRepository.findAll();
    }

    private void validarEntradas(Livro livro) {
        // Exemplo: não permitir mesmo tipo para entrada principal e secundária
        if (livro.getTipoEntradaPrincipal() != null && livro.getTipoEntradaSecundaria() != null &&
            livro.getTipoEntradaPrincipal().toString().equalsIgnoreCase(livro.getTipoEntradaSecundaria().toString())) {
            throw new IllegalArgumentException("Tipo da entrada principal e secundária não podem ser iguais.");
        }
    }
}
