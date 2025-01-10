package com.acervi.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.acervi.backend.model.CDU;
import com.acervi.backend.repository.CDURepository;

@Service
public class CDUService {

    private final CDURepository cduRepository;

    @Autowired
    public CDUService(CDURepository cduRepository) {
        this.cduRepository = cduRepository;
    }

    public CDU criarCDU(CDU cdu) {
        if (cdu.getCode() == null || cdu.getCode().isEmpty()) {
            throw new IllegalArgumentException("O código da CDU é obrigatório.");
        }
        if (cdu.getDescription() == null || cdu.getDescription().isEmpty()) {
            throw new IllegalArgumentException("A descrição da CDU é obrigatória.");
        }
        return cduRepository.save(cdu);
    }

    public CDU editCDU(Long id, CDU editedData) {
        CDU cduExistente = cduRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("CDU com ID " + id + " não encontrada"));
        cduExistente.setCode(editedData.getCode());
        cduExistente.setDescription(editedData.getDescription());
        return cduRepository.save(cduExistente);    
    }

    public void deleteCDU(Long id) {
        cduRepository.deleteById(id);
    }

    public List<CDU> searchCDU() {
        return cduRepository.findAll();
    }   
    
    public CDU searchOrCreateCDU(CDU cdu) {
        if (cdu.getId() != null) {
            return cduRepository.findById(cdu.getId())
                    .orElseThrow(() -> new IllegalArgumentException("CDU com ID " + cdu.getId() + " não encontrada"));
        }
        if (cdu.getCode() != null) {
            return cduRepository.findAll().stream()
                    .filter(existingCdu -> existingCdu.getCode().equals(cdu.getCode()))
                    .findFirst()
                    .orElseGet(() -> cduRepository.save(cdu));
        }
        throw new IllegalArgumentException("CDU inválida.");
    }    
    
}
