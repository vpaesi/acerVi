package com.acervi.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.acervi.backend.model.CDU;
import com.acervi.backend.service.CDUService;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/api/cdu")
public class CDUController {
    
    @Autowired
    private CDUService cduService;

    @Operation(summary = "Criar uma nova CDU")
    @PostMapping
    public CDU criarCDU(@RequestBody CDU cdu) {
        return cduService.criarCDU(cdu);
    }

    @Operation(summary = "Listar todas as CDU utilizadas")
    @GetMapping
    public List<CDU> listarCDU() {
        return cduService.listarCDU();
    }
    @Operation(summary = "Excluir uma CDU pelo ID")
    @DeleteMapping("/{id}")
    public void excluirCDU(@PathVariable Long id) {
        cduService.excluirCDU(id);
    }

}
