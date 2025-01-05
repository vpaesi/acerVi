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
        if (cdu.getCodigo() == null || cdu.getCodigo().isEmpty()) {
            throw new IllegalArgumentException("O código da CDU é obrigatório.");
        }
        if (cdu.getDescricao() == null || cdu.getDescricao().isEmpty()) {
            throw new IllegalArgumentException("A descrição da CDU é obrigatória.");
        }
        return cduRepository.save(cdu);
    }

    public CDU editarCDU(Long id, CDU dadosEditados) {
        CDU cduExistente = cduRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("CDU com ID " + id + " não encontrada"));
        cduExistente.setCodigo(dadosEditados.getCodigo());
        cduExistente.setDescricao(dadosEditados.getDescricao());
        return cduRepository.save(cduExistente);    
    }

    public void excluirCDU(Long id) {
        cduRepository.deleteById(id);
    }

    public List<CDU> listarCDU() {
        return cduRepository.findAll();
    }   
    
    public CDU buscarOuCriarCDU(CDU cdu) {
        if (cdu.getId() != null) {
            return cduRepository.findById(cdu.getId())
                    .orElseThrow(() -> new IllegalArgumentException("CDU com ID " + cdu.getId() + " não encontrada"));
        }
        if (cdu.getCodigo() != null) {
            return cduRepository.findAll().stream()
                    .filter(existingCdu -> existingCdu.getCodigo().equals(cdu.getCodigo()))
                    .findFirst()
                    .orElseGet(() -> cduRepository.save(cdu));
        }
        throw new IllegalArgumentException("CDU inválida.");
    }    
    
}
