package com.acervi.backend.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.acervi.backend.model.SubjectTopical;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/api/650")
public class SubjectTopicalController {
    
    @Operation(summary = "Search all subject topicals available")
    @GetMapping()
    public List<SubjectTopical> getSubjectTopical() {
        return Arrays.asList(SubjectTopical.values());
    }
}
