package com.acervi.backend.controller;

import com.acervi.backend.dto.LivroDTO;
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
    public ResponseEntity<LivroDTO> cadastrarLivro(@RequestBody @Valid LivroDTO livroDTO) {
        LivroDTO salvo = livroService.salvarLivro(livroDTO);
        return ResponseEntity.ok(salvo);
    }

    @GetMapping("/{cutter}")
    public ResponseEntity<LivroDTO> buscarPorCutter(@PathVariable String cutter) {
        LivroDTO dto = livroService.buscarPorCutter(cutter);
        return ResponseEntity.ok(dto);
    }

    @GetMapping
    public ResponseEntity<List<LivroDTO>> listarTodos() {
        return ResponseEntity.ok(livroService.listarTodos());
    }

    @DeleteMapping("/{cutter}")
    public ResponseEntity<Void> deletar(@PathVariable String cutter) {
        livroService.excluirPorCutter(cutter);
        return ResponseEntity.noContent().build();
    }
}
