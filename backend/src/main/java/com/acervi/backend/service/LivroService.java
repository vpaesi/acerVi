package com.acervi.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.hibernate.Hibernate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.acervi.backend.dto.LivroDTO;
import com.acervi.backend.model.CDU;
import com.acervi.backend.model.EntradaPrincipal;
import com.acervi.backend.model.Livro;
import com.acervi.backend.repository.LivroRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
public class LivroService {

    private static final Logger logger = LoggerFactory.getLogger(LivroService.class);

    private final LivroRepository livroRepository;
    private final CDUService cduService;

    @Autowired
    public LivroService(LivroRepository livroRepository, CDUService cduService) {
        this.livroRepository = livroRepository;
        this.cduService = cduService;
    }

    @Transactional
    public Livro criarLivro(Livro livro) {
        logger.info("Criando livro: {}", livro);
        if (livro == null) {
            throw new IllegalArgumentException("O objeto Livro não pode ser nulo");
        }
        livro.setCdu(cduService.buscarOuCriarCDU(livro.getCdu()));
        Livro criado = livroRepository.save(livro);
        logger.info("Livro criado com sucesso: {}", criado);
        return criado;
    }

    @Transactional
    public LivroDTO buscarLivro(Long id) {
        logger.info("Buscando livro com ID: {}", id);
        Livro livro = livroRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Livro com ID " + id + " não encontrado"));

        Hibernate.initialize(livro.getEntradaPrincipal());
        Hibernate.initialize(livro.getAssuntoTopico());
        Hibernate.initialize(livro.getEntradaSecundariaSerie());

        LivroDTO livroDTO = new LivroDTO();
        livroDTO.setId(livro.getId());
        livroDTO.setCdu(livro.getCdu());
        livroDTO.setCutterCodigo(livro.getCutter().getCodigo());
        livroDTO.setEntradaPrincipal(livro.getEntradaPrincipal().stream()
                .map(EntradaPrincipal::getMarc100NomePessoalEntidadeEventoTitulo)
                .collect(Collectors.toList()));
        livroDTO.setTituloPrincipal(
                livro.getTituloPrincipal() != null
                        ? livro.getTituloPrincipal().getMarc245TituloPrincipal()
                        : null);
        livroDTO.setDescricaoFisica(livro.getDescricaoFisica().getMarc300Páginas());
        livroDTO.setDistribuicao(livro.getDistribuicao().getMarc260Editora());
        livroDTO.setEdicao(
                livro.getEdicao() != null
                        ? livro.getEdicao().getMarc250numeroEditadaRevisada()
                        : null);
        livroDTO.setAssuntoTopico(livro.getAssuntoTopico().stream()
                .map(Enum::name)
                .collect(Collectors.toList()));
        livroDTO.setSerieRelacionada(
                livro.getEntradaSecundariaSerie() != null
                        ? livro.getEntradaSecundariaSerie().getMarc490SerieRelacionada()
                        : null);

        logger.info("Livro encontrado: {}", livroDTO);
        return livroDTO;
    }

    public List<Livro> listarLivros() {
        logger.info("Listando todos os livros");
        List<Livro> livros = livroRepository.findAll();
        logger.info("Livros encontrados: {}", livros);
        return livros;
    }

    public void excluirLivro(Long id) {
        logger.info("Excluindo livro com ID: {}", id);
        livroRepository.deleteById(id);
        logger.info("Livro com ID {} excluído com sucesso", id);
    }

    @Transactional
    public Livro editarLivro(Long id, Livro dadosEditados) {
        logger.info("Editando livro com ID: {}", id);
        Livro livro = livroRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Livro com ID " + id + " não encontrado"));

        if (dadosEditados.getCdu() != null) {
            livro.setCdu(cduService.buscarOuCriarCDU(dadosEditados.getCdu()));
        }

        livro.setCutter(dadosEditados.getCutter());
        livro.setDistribuicao(dadosEditados.getDistribuicao());
        livro.setDescricaoFisica(dadosEditados.getDescricaoFisica());
        livro.setEdicao(dadosEditados.getEdicao());
        livro.setTituloPrincipal(dadosEditados.getTituloPrincipal());
        livro.setEntradaPrincipal(dadosEditados.getEntradaPrincipal());
        livro.setAssuntoTopico(dadosEditados.getAssuntoTopico());
        livro.setSerieRelacionada(dadosEditados.getSerieRelacionada());
        livro.setAssuntoPessoa(dadosEditados.getAssuntoPessoa());
        livro.setEntradaSecundaria(dadosEditados.getEntradaSecundaria());
        livro.setEntradaSecundariaSerie(dadosEditados.getEntradaSecundariaSerie());

        Livro atualizado = livroRepository.save(livro);
        logger.info("Livro com ID {} atualizado com sucesso: {}", id, atualizado);
        return atualizado;
    }

    @Transactional
    public Livro editarCDU(Long id, CDU novaCDU) {
        logger.info("Editando CDU do livro com ID: {}", id);
        Livro livro = livroRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Livro com ID " + id + " não encontrado"));

        livro.setCdu(cduService.buscarOuCriarCDU(novaCDU));
        Livro atualizado = livroRepository.save(livro);
        logger.info("CDU do livro com ID {} atualizada com sucesso: {}", id, atualizado);
        return atualizado;
    }
}
