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
import com.acervi.backend.repository.BookRepository;
import com.acervi.backend.repository.EntryAddedSerieRepository;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class BookRepositoryIntegrationTest {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private EntryAddedSerieRepository entryAddedSerieRepository;

    private Book criarBookCompleto(String title, String autor, SubjectTopical subjectTopical) {
        Book book = new Book();

        CDU cdu = new CDU("001.24", "Descrição CDU");
        book.setCdu(cdu);

        Cutter cutter = new Cutter();
        cutter.setCode("C124");
        book.setCutter(cutter);

        Publication publication = new Publication();
        publication.setMarc260Publisher("Publisher Teste");
        publication.setMarc260Date(2023);
        book.setPublication(publication);

        PhysicalDescription physicalDescription = new PhysicalDescription();
        physicalDescription.setMarc300Pages("150 p.");
        physicalDescription.setMarc300Volumes(1);
        book.setPhysicalDescription(physicalDescription);

        TitleMain titleMain = new TitleMain();
        titleMain.setMarc245TitleMain(title);
        book.setTitleMain(titleMain);

        EntryMain entryMain = new EntryMain();
        entryMain.setMarc100PersonalCorporateMeeting(autor);
        entryMain.setBook(book);
        book.getEntryMain().add(entryMain);

        book.getSubjectTopical().add(subjectTopical);

        return book;
    }

    @Test
    void testSalvarBook() {
        Book book = criarBookCompleto("Título do Book", "Autor do Book", SubjectTopical.ROMANCE);

        Book salvo = bookRepository.saveAndFlush(book);

        assertThat(salvo.getCdu().getCode()).isEqualTo("001.24");
        assertThat(salvo.getCdu().getDescription()).isEqualTo("Descrição CDU");
        assertThat(salvo.getCutter().getCode()).isEqualTo("C124");
        assertThat(salvo.getTitleMain().getMarc245TitleMain()).isEqualTo("Título do Book");
        assertThat(salvo.getEntryMain().get(0).getMarc100PersonalCorporateMeeting()).isEqualTo("Autor do Book");
        assertThat(salvo.getPublication().getMarc260Publisher()).isEqualTo("Publisher Teste");
        assertThat(salvo.getPublication().getMarc260Date()).isEqualTo(2023);
        assertThat(salvo.getPhysicalDescription().getMarc300Pages()).isEqualTo("150 p.");
        assertThat(salvo.getPhysicalDescription().getMarc300Volumes()).isEqualTo(1);
        assertThat(salvo.getSubjectTopical().get(0)).isEqualTo(SubjectTopical.ROMANCE);
    }

    @Test
    void testSEARCHBookPorTitle() {
        Book book = criarBookCompleto("Título Teste", "Autor Teste", SubjectTopical.FICCAO_CIENTIFICA);
        bookRepository.saveAndFlush(book);

        List<Book> books = bookRepository.findAll();

        assertNotNull(books);
        assertFalse(books.isEmpty());
        assertEquals(1, books.size());
        assertEquals("Título Teste", books.get(0).getTitleMain().getMarc245TitleMain());
    }

    @Test
    void testSEARCHBookPorEntryMain() {
        Book book = criarBookCompleto("Título Entry Main Teste", "Autor Entry Main", SubjectTopical.ROMANCE);
        bookRepository.saveAndFlush(book);

        List<Book> books = bookRepository.findByEntryMain("Autor Entry Main");

        assertNotNull(books);
        assertFalse(books.isEmpty());
        assertEquals(1, books.size());
        assertEquals("Título Entry Main Teste", books.get(0).getTitleMain().getMarc245TitleMain());
        assertEquals("Autor Entry Main", books.get(0).getEntryMain().get(0).getMarc100PersonalCorporateMeeting());
    }

    @Test
    void testSEARCHBookPorSubjectTopical() {
        Book book = criarBookCompleto("Título Subject Topical Teste", "Autor Teste", SubjectTopical.FANTASIA);
        bookRepository.saveAndFlush(book);

        List<Book> books = bookRepository.findBySubjectTopical(SubjectTopical.FANTASIA);

        assertNotNull(books);
        assertFalse(books.isEmpty());
        assertEquals(1, books.size());
        assertEquals("Título Subject Topical Teste", books.get(0).getTitleMain().getMarc245TitleMain());
        assertTrue(books.get(0).getSubjectTopical().contains(SubjectTopical.FANTASIA));
    }

    @Test
    void testSEARCHBookPorEntryAddedSerie() {
        EntryAddedSerie entryAddedSerie = new EntryAddedSerie();
        entryAddedSerie.setMarc800TitleCollectionSeries("Serie Teste");
        entryAddedSerie = entryAddedSerieRepository.save(entryAddedSerie);

        Book book = criarBookCompleto("Título Entry Secundária Série", "Autor Teste", SubjectTopical.FICCAO_INFANTO_JUVENIL);
        book.setEntryAddedSerie(entryAddedSerie);

        bookRepository.saveAndFlush(book);

        List<Book> books = bookRepository.findbyEntryAddedSerie("Serie Teste");

        assertFalse(books.isEmpty());
        assertEquals(1, books.size());
        assertEquals("Título Entry Secundária Série", books.get(0).getTitleMain().getMarc245TitleMain());
        assertEquals("Serie Teste", books.get(0).getEntryAddedSerie().getMarc800TitleCollectionSeries());
    }

    @Test
    void testDeleteBook() {
        Book book = criarBookCompleto("Título Exclusão", "Autor Teste", SubjectTopical.FICCAO_INFANTO_JUVENIL);
        bookRepository.saveAndFlush(book);

        List<Book> books = bookRepository.findAll();
        assertFalse(books.isEmpty());

        bookRepository.delete(book);

        books = bookRepository.findAll();
        assertTrue(books.isEmpty());
    }

    @Test
    void testEditBook() {
        Book book = criarBookCompleto("Título Atualização", "Autor Teste", SubjectTopical.FICCAO_INFANTO_JUVENIL);

        book = bookRepository.saveAndFlush(book);

        book.getCdu().setCode("001.25");
        book.getCdu().setDescription("Descrição CDU Atualizada");
        book.getCutter().setCode("C123a");
        book.getEntryMain().get(0).setMarc100PersonalCorporateMeeting("Autor Updated");
        book.getTitleMain().setMarc245TitleMain("Título Updated");
        book.getPublication().setMarc260Publisher("Publisher Atualizada");
        book.getPublication().setMarc260Date(2024);
        book.getPhysicalDescription().setMarc300Pages("200 p.");
        book.getPhysicalDescription().setMarc300Volumes(2);

        book.getSubjectTopical().clear();
        book.getSubjectTopical().addAll(List.of(SubjectTopical.ROMANCE));

        bookRepository.saveAndFlush(book);

        Book bookUpdated = bookRepository.findById(book.getId()).orElseThrow();

        assertEquals("001.25", bookUpdated.getCdu().getCode());
        assertEquals("Descrição CDU Atualizada", bookUpdated.getCdu().getDescription());
        assertEquals("C123a", bookUpdated.getCutter().getCode());
        assertEquals("Autor Updated", bookUpdated.getEntryMain().get(0).getMarc100PersonalCorporateMeeting());
        assertEquals("Título Updated", bookUpdated.getTitleMain().getMarc245TitleMain());
        assertEquals("Publisher Atualizada", bookUpdated.getPublication().getMarc260Publisher());
        assertEquals(2024, bookUpdated.getPublication().getMarc260Date());
        assertEquals("200 p.", bookUpdated.getPhysicalDescription().getMarc300Pages());
        assertEquals(2, bookUpdated.getPhysicalDescription().getMarc300Volumes());
        assertEquals(SubjectTopical.ROMANCE, bookUpdated.getSubjectTopical().get(0));
    }
          
}
