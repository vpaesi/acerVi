package com.acervi.backend.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.acervi.backend.model.AssuntoTopico;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/api/650")
public class AssuntoTopicoController {
    
    @Operation(summary = "Listar todos os tópicos de assunto disponíveis")
    @GetMapping()
    public List<AssuntoTopico> getAssuntoTopico() {
        return Arrays.asList(AssuntoTopico.values());
    }
}
