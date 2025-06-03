package com.acervi.backend.controller;

import com.acervi.backend.model.Livro;
import com.acervi.backend.service.LivroService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/livros")
public class LivroController {

    @Autowired
    private LivroService livroService;

    @PostMapping
    public ResponseEntity<Livro> cadastrarLivro(@RequestBody @Valid Livro livro) {
        Livro salvo = livroService.salvarLivro(livro);
        return ResponseEntity.ok(salvo);
    }

    @GetMapping("/{cdu}")
    public ResponseEntity<Livro> buscarPorCdu(@PathVariable String cdu) {
        return ResponseEntity.ok(livroService.buscarPorCdu(cdu));
    }

    @GetMapping
    public ResponseEntity<List<Livro>> listarTodos() {
        return ResponseEntity.ok(livroService.listarTodos());
    }
}
