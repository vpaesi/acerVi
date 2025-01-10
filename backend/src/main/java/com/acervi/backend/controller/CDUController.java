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

    @Operation(summary = "Criate new CDU")
    @PostMapping
    public ResponseEntity<?> criarCDU(@RequestBody CDU cdu) {
        logger.info("Request received for create CDU: {}", cdu);
        if (cdu.getCode() == null || cdu.getCode().isEmpty()) {
            logger.warn("Code of CDU invalid: {}", cdu.getCode());
            return ResponseEntity.badRequest().body("The code of the CDU is mandatory.");
        }
        if (cdu.getDescription() == null || cdu.getDescription().isEmpty()) {
            logger.warn("Description of CDU invalid: {}", cdu.getDescription());
            return ResponseEntity.badRequest().body("The description of the CDU is mandatory.");
        }
        CDU newCDU = cduService.criarCDU(cdu);
        logger.info("CDU successfully created: {}", newCDU);
        return ResponseEntity.ok(newCDU);
    }

    @Operation(summary = "Search all CDU available")
    @GetMapping
    public ResponseEntity<List<CDU>> searchCDU() {
        logger.info("Request received to search all CDU");
        List<CDU> cdus = cduService.searchCDU();
        logger.info("Found CDU: {}", cdus);
        return ResponseEntity.ok(cdus);
    }

    @Operation(summary = "Delete CDU by ID")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCDU(@PathVariable Long id) {
        logger.info("Request received to delete CDU with ID: {}", id);
        try {
            cduService.deleteCDU(id);
            logger.info("CDU with ID {} successufully deleted", id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            logger.error("Error when deleting CDU with ID {}: {}", id, e.getMessage());
            return ResponseEntity.status(500).body("Error when delete CDU: " + e.getMessage());
        }
    }
}
