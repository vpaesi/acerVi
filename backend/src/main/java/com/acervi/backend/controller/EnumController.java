package com.acervi.backend.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.acervi.backend.model.AssuntoTopico;

@RestController
@RequestMapping("/api/enum")
public class EnumController {
    
    @GetMapping("/650")
    public List<AssuntoTopico> getAssuntoTopico() {
        return Arrays.asList(AssuntoTopico.values());
    }

}
