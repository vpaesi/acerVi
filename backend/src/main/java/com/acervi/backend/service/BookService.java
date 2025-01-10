package com.acervi.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.hibernate.Hibernate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.acervi.backend.dto.BookDTO;
import com.acervi.backend.model.SubjectTopical;
import com.acervi.backend.model.CDU;
import com.acervi.backend.model.EntryMain;
import com.acervi.backend.model.Book;
import com.acervi.backend.repository.BookRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
public class BookService {

    private static final Logger logger = LoggerFactory.getLogger(BookService.class);

    private final BookRepository bookRepository;
    private final CDUService cduService;

    @Autowired
    public BookService(BookRepository bookRepository, CDUService cduService) {
        this.bookRepository = bookRepository;
        this.cduService = cduService;
    }

    @Transactional
    public Book criarBook(Book book) {
        logger.info("Criando book: {}", book);
        if (book == null) {
            throw new IllegalArgumentException("O objeto Book não pode ser nulo");
        }
        book.setCdu(cduService.searchOrCreateCDU(book.getCdu()));
        Book created = bookRepository.save(book);
        logger.info("Book created com sucesso: {}", created);
        return created;
    }

    @Transactional
    public BookDTO searchBook(Long id) {
        logger.info("Buscando book com ID: {}", id);
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Book com ID " + id + " não encontrado"));

        Hibernate.initialize(book.getEntryMain());
        Hibernate.initialize(book.getSubjectTopical());
        Hibernate.initialize(book.getEntryAddedSerie());

        BookDTO bookDTO = new BookDTO();
        bookDTO.setId(book.getId());
        bookDTO.setCdu(book.getCdu());
        bookDTO.setCutterCode(book.getCutter().getCode());
        bookDTO.setEntryMain(book.getEntryMain().stream()
                .map(EntryMain::getMarc100PersonalCorporateMeeting)
                .collect(Collectors.toList()));
        if (book.getTitleMain() != null) {
            bookDTO.setTitleMain(book.getTitleMain().getMarc245TitleMain());
            bookDTO.setSubtitle(book.getTitleMain().getMarc245Subtitle());
        } else {
            bookDTO.setTitleMain(null);
            bookDTO.setSubtitle(null);
        }
        if (book.getCoverLink() != null) {
            bookDTO.setCoverLink(book.getCoverLink().getMarc856CoverLink());
        } else {
            bookDTO.setCoverLink(null);
        }
        bookDTO.setPhysicalDescription(book.getPhysicalDescription().getMarc300Pages());
        bookDTO.setPublication(book.getPublication().getMarc260Publisher());
        bookDTO.setEdition(
                book.getEdition() != null
                        ? book.getEdition().getMarc250numberEditionStatemen()
                        : null);
        bookDTO.setSubjectTopical(book.getSubjectTopical().stream()
                .map(Enum::name)
                .collect(Collectors.toList()));
        bookDTO.setSeriesStatement(
                book.getEntryAddedSerie() != null
                        ? book.getEntryAddedSerie().getMarc490SeriesStatement()
                        : null);

        logger.info("Book encontrado: {}", bookDTO);
        return bookDTO;
    }

    public List<Book> searchBooks() {
        logger.info("Listando todos os books");
        List<Book> books = bookRepository.findAll();
        logger.info("Books encontrados: {}", books);
        return books;
    }

    public List<Book> searchPorSubject(SubjectTopical subject) {
        return bookRepository.findBySubjectTopical(subject);
    }

    public void deleteBook(Long id) {
        logger.info("Excluindo book com ID: {}", id);
        bookRepository.deleteById(id);
        logger.info("Book com ID {} excluído com sucesso", id);
    }

    @Transactional
    public Book editBook(Long id, Book editedData) {
        logger.info("Editando book com ID: {}", id);
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Book com ID " + id + " não encontrado"));

        if (editedData.getCdu() != null) {
            book.setCdu(cduService.searchOrCreateCDU(editedData.getCdu()));
        }

        book.setCutter(editedData.getCutter());
        book.setPublication(editedData.getPublication());
        book.setPhysicalDescription(editedData.getPhysicalDescription());
        book.setEdition(editedData.getEdition());
        book.setTitleMain(editedData.getTitleMain());
        book.setEntryMain(editedData.getEntryMain());
        book.setSubjectTopical(editedData.getSubjectTopical());
        book.setSeriesStatement(editedData.getSeriesStatement());
        book.setSubjectPersonal(editedData.getSubjectPersonal());
        book.setEntryAdded(editedData.getEntryAdded());
        book.setEntryAddedSerie(editedData.getEntryAddedSerie());
        book.setCoverLink(editedData.getCoverLink());

        Book updated = bookRepository.save(book);
        logger.info("Book com ID {} updated com sucesso: {}", id, updated);
        return updated;
    }

    @Transactional
    public Book editCDU(Long id, CDU newCDU) {
        logger.info("Editando CDU do book com ID: {}", id);
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Book com ID " + id + " não encontrado"));

        book.setCdu(cduService.searchOrCreateCDU(newCDU));
        Book updated = bookRepository.save(book);
        logger.info("CDU do book com ID {} atualizada com sucesso: {}", id, updated);
        return updated;
    }
}
