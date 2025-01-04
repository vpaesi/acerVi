package com.acervi.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.acervi.backend.model.Livro;
import com.acervi.backend.service.LivroService;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/api/livro")
public class LivroController {

    @Autowired
    private LivroService livroService;
    
    @Operation(summary = "Criar um novo livro")
    @PostMapping
    public Livro criarLivro(@RequestBody Livro livro) {
        return livroService.criarLivro(livro);
    }

    @Operation(summary = "Buscar um livro pelo ID")
    @PostMapping("/{id}")
    public Livro buscarLivro(@PathVariable Long id) {
        return livroService.buscarLivro(id);
    }

    @Operation(summary = "Editar um livro existente")
    @PutMapping("/{id}")
    public Livro editarLivro(@PathVariable Long id, @RequestBody Livro dadosEditados) {
        return livroService.editarLivro(id, dadosEditados);
    }

    @Operation(summary = "Listar todos os livros")
    @GetMapping
    public List<Livro> listarLivros() {
        return livroService.listarLivros();
    }

    @Operation(summary = "Excluir um livro pelo ID")
    @DeleteMapping("/{id}")
    public void excluirLivro(@PathVariable Long id) {
        livroService.excluirLivro(id);
    }
}
