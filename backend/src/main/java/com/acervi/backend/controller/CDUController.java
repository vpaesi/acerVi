package com.acervi.backend.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.acervi.backend.model.CDU;
import com.acervi.backend.service.CDUService;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/api/cdu")
public class CDUController {

    private static final Logger logger = LoggerFactory.getLogger(CDUController.class);

    @Autowired
    private CDUService cduService;

    @Operation(summary = "Criar uma nova CDU")
    @PostMapping
    public ResponseEntity<?> criarCDU(@RequestBody CDU cdu) {
        logger.info("Recebida solicitação para criar CDU: {}", cdu);
        if (cdu.getCodigo() == null || cdu.getCodigo().isEmpty()) {
            logger.warn("Código da CDU inválido: {}", cdu.getCodigo());
            return ResponseEntity.badRequest().body("O código da CDU é obrigatório.");
        }
        if (cdu.getDescricao() == null || cdu.getDescricao().isEmpty()) {
            logger.warn("Descrição da CDU inválida: {}", cdu.getDescricao());
            return ResponseEntity.badRequest().body("A descrição da CDU é obrigatória.");
        }
        CDU novaCdu = cduService.criarCDU(cdu);
        logger.info("CDU criada com sucesso: {}", novaCdu);
        return ResponseEntity.ok(novaCdu);
    }

    @Operation(summary = "Listar todas as CDU disponíveis")
    @GetMapping
    public ResponseEntity<List<CDU>> listarCDU() {
        logger.info("Recebida solicitação para listar todas as CDUs");
        List<CDU> cdus = cduService.listarCDU();
        logger.info("CDUs encontradas: {}", cdus);
        return ResponseEntity.ok(cdus);
    }

    @Operation(summary = "Excluir uma CDU pelo ID")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> excluirCDU(@PathVariable Long id) {
        logger.info("Recebida solicitação para excluir CDU com ID: {}", id);
        try {
            cduService.excluirCDU(id);
            logger.info("CDU com ID {} excluída com sucesso", id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            logger.error("Erro ao excluir CDU com ID {}: {}", id, e.getMessage());
            return ResponseEntity.status(500).body("Erro ao excluir CDU: " + e.getMessage());
        }
    }
}
