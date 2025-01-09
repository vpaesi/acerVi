package com.acervi.backend;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import com.acervi.backend.model.*;
import com.acervi.backend.repository.LivroRepository;
import com.acervi.backend.repository.EntradaSecundariaSerieRepository;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class LivroRepositoryIntegrationTest {

    @Autowired
    private LivroRepository livroRepository;

    @Autowired
    private EntradaSecundariaSerieRepository entradaSecundariaSerieRepository;

    private Livro criarLivroCompleto(String titulo, String autor, AssuntoTopico assuntoTopico) {
        Livro livro = new Livro();

        CDU cdu = new CDU("001.24", "Descrição CDU");
        livro.setCdu(cdu);

        Cutter cutter = new Cutter();
        cutter.setCodigo("C124");
        livro.setCutter(cutter);

        Distribuicao distribuicao = new Distribuicao();
        distribuicao.setMarc260Editora("Editora Teste");
        distribuicao.setMarc260Data(2023);
        livro.setDistribuicao(distribuicao);

        DescricaoFisica descricaoFisica = new DescricaoFisica();
        descricaoFisica.setMarc300Páginas("150 p.");
        descricaoFisica.setMarc300Volumes(1);
        livro.setDescricaoFisica(descricaoFisica);

        TituloPrincipal tituloPrincipal = new TituloPrincipal();
        tituloPrincipal.setMarc245TituloPrincipal(titulo);
        livro.setTituloPrincipal(tituloPrincipal);

        EntradaPrincipal entradaPrincipal = new EntradaPrincipal();
        entradaPrincipal.setMarc100NomePessoalEntidadeEventoTitulo(autor);
        entradaPrincipal.setLivro(livro);
        livro.getEntradaPrincipal().add(entradaPrincipal);

        livro.getAssuntoTopico().add(assuntoTopico);

        return livro;
    }

    @Test
    void testSalvarLivro() {
        Livro livro = criarLivroCompleto("Título do Livro", "Autor do Livro", AssuntoTopico.ROMANCE);

        Livro salvo = livroRepository.saveAndFlush(livro);

        assertThat(salvo.getCdu().getCodigo()).isEqualTo("001.24");
        assertThat(salvo.getCdu().getDescricao()).isEqualTo("Descrição CDU");
        assertThat(salvo.getCutter().getCodigo()).isEqualTo("C124");
        assertThat(salvo.getTituloPrincipal().getMarc245TituloPrincipal()).isEqualTo("Título do Livro");
        assertThat(salvo.getEntradaPrincipal().get(0).getMarc100NomePessoalEntidadeEventoTitulo()).isEqualTo("Autor do Livro");
        assertThat(salvo.getDistribuicao().getMarc260Editora()).isEqualTo("Editora Teste");
        assertThat(salvo.getDistribuicao().getMarc260Data()).isEqualTo(2023);
        assertThat(salvo.getDescricaoFisica().getMarc300Páginas()).isEqualTo("150 p.");
        assertThat(salvo.getDescricaoFisica().getMarc300Volumes()).isEqualTo(1);
        assertThat(salvo.getAssuntoTopico().get(0)).isEqualTo(AssuntoTopico.ROMANCE);
    }

    @Test
    void testBuscarLivroPorTitulo() {
        Livro livro = criarLivroCompleto("Título Teste", "Autor Teste", AssuntoTopico.FICCAO_CIENTIFICA);
        livroRepository.saveAndFlush(livro);

        List<Livro> livros = livroRepository.findAll();

        assertNotNull(livros);
        assertFalse(livros.isEmpty());
        assertEquals(1, livros.size());
        assertEquals("Título Teste", livros.get(0).getTituloPrincipal().getMarc245TituloPrincipal());
    }

    @Test
    void testBuscarLivroPorEntradaPrincipal() {
        Livro livro = criarLivroCompleto("Título Entrada Principal Teste", "Autor Entrada Principal", AssuntoTopico.ROMANCE);
        livroRepository.saveAndFlush(livro);

        List<Livro> livros = livroRepository.findByEntradaPrincipal("Autor Entrada Principal");

        assertNotNull(livros);
        assertFalse(livros.isEmpty());
        assertEquals(1, livros.size());
        assertEquals("Título Entrada Principal Teste", livros.get(0).getTituloPrincipal().getMarc245TituloPrincipal());
        assertEquals("Autor Entrada Principal", livros.get(0).getEntradaPrincipal().get(0).getMarc100NomePessoalEntidadeEventoTitulo());
    }

    @Test
    void testBuscarLivroPorAssuntoTopico() {
        Livro livro = criarLivroCompleto("Título Assunto Topico Teste", "Autor Teste", AssuntoTopico.FANTASIA);
        livroRepository.saveAndFlush(livro);

        List<Livro> livros = livroRepository.findByAssuntoTopico(AssuntoTopico.FANTASIA);

        assertNotNull(livros);
        assertFalse(livros.isEmpty());
        assertEquals(1, livros.size());
        assertEquals("Título Assunto Topico Teste", livros.get(0).getTituloPrincipal().getMarc245TituloPrincipal());
        assertTrue(livros.get(0).getAssuntoTopico().contains(AssuntoTopico.FANTASIA));
    }

    @Test
    void testBuscarLivroPorEntradaSecundariaSerie() {
        EntradaSecundariaSerie entradaSecundariaSerie = new EntradaSecundariaSerie();
        entradaSecundariaSerie.setMarc800TituloSerieColecao("Serie Teste");
        entradaSecundariaSerie = entradaSecundariaSerieRepository.save(entradaSecundariaSerie);

        Livro livro = criarLivroCompleto("Título Entrada Secundária Série", "Autor Teste", AssuntoTopico.FICCAO_INFANTO_JUVENIL);
        livro.setEntradaSecundariaSerie(entradaSecundariaSerie);

        livroRepository.saveAndFlush(livro);

        List<Livro> livros = livroRepository.findbyEntradaSecundariaSerie("Serie Teste");

        assertFalse(livros.isEmpty());
        assertEquals(1, livros.size());
        assertEquals("Título Entrada Secundária Série", livros.get(0).getTituloPrincipal().getMarc245TituloPrincipal());
        assertEquals("Serie Teste", livros.get(0).getEntradaSecundariaSerie().getMarc800TituloSerieColecao());
    }

    @Test
    void testExcluirLivro() {
        Livro livro = criarLivroCompleto("Título Exclusão", "Autor Teste", AssuntoTopico.FICCAO_INFANTO_JUVENIL);
        livroRepository.saveAndFlush(livro);

        List<Livro> livros = livroRepository.findAll();
        assertFalse(livros.isEmpty());

        livroRepository.delete(livro);

        livros = livroRepository.findAll();
        assertTrue(livros.isEmpty());
    }

    @Test
    void testEditarLivro() {
        Livro livro = criarLivroCompleto("Título Atualização", "Autor Teste", AssuntoTopico.FICCAO_INFANTO_JUVENIL);

        livro = livroRepository.saveAndFlush(livro);

        livro.getCdu().setCodigo("001.25");
        livro.getCdu().setDescricao("Descrição CDU Atualizada");
        livro.getCutter().setCodigo("C123a");
        livro.getEntradaPrincipal().get(0).setMarc100NomePessoalEntidadeEventoTitulo("Autor Atualizado");
        livro.getTituloPrincipal().setMarc245TituloPrincipal("Título Atualizado");
        livro.getDistribuicao().setMarc260Editora("Editora Atualizada");
        livro.getDistribuicao().setMarc260Data(2024);
        livro.getDescricaoFisica().setMarc300Páginas("200 p.");
        livro.getDescricaoFisica().setMarc300Volumes(2);

        livro.getAssuntoTopico().clear();
        livro.getAssuntoTopico().addAll(List.of(AssuntoTopico.ROMANCE));

        livroRepository.saveAndFlush(livro);

        Livro livroAtualizado = livroRepository.findById(livro.getId()).orElseThrow();

        assertEquals("001.25", livroAtualizado.getCdu().getCodigo());
        assertEquals("Descrição CDU Atualizada", livroAtualizado.getCdu().getDescricao());
        assertEquals("C123a", livroAtualizado.getCutter().getCodigo());
        assertEquals("Autor Atualizado", livroAtualizado.getEntradaPrincipal().get(0).getMarc100NomePessoalEntidadeEventoTitulo());
        assertEquals("Título Atualizado", livroAtualizado.getTituloPrincipal().getMarc245TituloPrincipal());
        assertEquals("Editora Atualizada", livroAtualizado.getDistribuicao().getMarc260Editora());
        assertEquals(2024, livroAtualizado.getDistribuicao().getMarc260Data());
        assertEquals("200 p.", livroAtualizado.getDescricaoFisica().getMarc300Páginas());
        assertEquals(2, livroAtualizado.getDescricaoFisica().getMarc300Volumes());
        assertEquals(AssuntoTopico.ROMANCE, livroAtualizado.getAssuntoTopico().get(0));
    }
          
}
