package com.acervi.backend.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.acervi.backend.dto.LivroDTO;
import com.acervi.backend.model.AssuntoTopico;
import com.acervi.backend.model.CDU;
import com.acervi.backend.model.Livro;
import com.acervi.backend.service.LivroService;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/api/livro")
public class LivroController {

    private static final Logger logger = LoggerFactory.getLogger(LivroController.class);

    @Autowired
    private LivroService livroService;

    @Operation(summary = "Criar um novo livro")
    @PostMapping
    public Livro criarLivro(@RequestBody Livro livro) {
        logger.info("Recebida solicitação para criar livro: {}", livro);
        for (AssuntoTopico assuntoTopico : livro.getAssuntoTopico()) {
            if (!AssuntoTopico.isValid(assuntoTopico.name())) {
                logger.warn("Assunto inválido: {}", assuntoTopico);
                throw new IllegalArgumentException("Assunto inválido: " + assuntoTopico);
            }
        }
        Livro criado = livroService.criarLivro(livro);
        logger.info("Livro criado com sucesso: {}", criado);
        return criado;
    }

    @Operation(summary = "Buscar um livro pelo ID")
    @GetMapping("/{id}")
    public ResponseEntity<LivroDTO> buscarLivro(@PathVariable Long id) {
        logger.info("Recebida solicitação para buscar livro com ID: {}", id);
        LivroDTO livroDTO = livroService.buscarLivro(id);
        logger.info("Livro encontrado: {}", livroDTO);
        return ResponseEntity.ok(livroDTO);
    }

    @Operation(summary = "Editar um livro existente")
    @PutMapping("/{id}")
    public Livro editarLivro(@PathVariable Long id, @RequestBody Livro dadosEditados) {
        logger.info("Recebida solicitação para editar livro com ID: {}", id);
        Livro atualizado = livroService.editarLivro(id, dadosEditados);
        logger.info("Livro atualizado com sucesso: {}", atualizado);
        return atualizado;
    }

    @Operation(summary = "Listar todos os livros")
    @GetMapping
    public List<Livro> listarLivros() {
        logger.info("Recebida solicitação para listar todos os livros");
        List<Livro> livros = livroService.listarLivros();
        logger.info("Livros encontrados: {}", livros);
        return livros;
    }

    @Operation(summary = "Excluir um livro pelo ID")
    @DeleteMapping("/{id}")
    public void excluirLivro(@PathVariable Long id) {
        logger.info("Recebida solicitação para excluir livro com ID: {}", id);
        livroService.excluirLivro(id);
        logger.info("Livro com ID {} excluído com sucesso", id);
    }

    @Operation(summary = "Editar a CDU de um livro existente")
    @PutMapping("/{id}/cdu")
    public ResponseEntity<?> editarCDU(@PathVariable Long id, @RequestBody CDU novaCDU) {
        logger.info("Recebida solicitação para editar CDU do livro com ID: {}", id);
        if (novaCDU == null || (novaCDU.getCodigo() == null && novaCDU.getId() == null)) {
            logger.warn("CDU fornecida é inválida: {}", novaCDU);
            return ResponseEntity.badRequest().body("A CDU fornecida é inválida. Forneça um código ou ID válido.");
        }
        Livro livroAtualizado = livroService.editarCDU(id, novaCDU);
        logger.info("CDU do livro com ID {} atualizada com sucesso: {}", id, livroAtualizado);
        return ResponseEntity.ok(livroAtualizado);
    }
}

