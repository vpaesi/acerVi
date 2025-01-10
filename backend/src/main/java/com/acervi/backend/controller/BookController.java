package com.acervi.backend.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.acervi.backend.dto.BookDTO;
import com.acervi.backend.model.SubjectTopical;
import com.acervi.backend.model.CDU;
import com.acervi.backend.model.Book;
import com.acervi.backend.service.BookService;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/api/book")
public class BookController {

    private static final Logger logger = LoggerFactory.getLogger(BookController.class);

    @Autowired
    private BookService bookService;

    @Operation(summary = "Create new book")
    @PostMapping
    public Book criarBook(@RequestBody Book book) {
        logger.info("Received request to create book: {}", book);
        for (SubjectTopical subjectTopical : book.getSubjectTopical()) {
            if (!SubjectTopical.isValid(subjectTopical.name())) {
                logger.warn("Subject inválido: {}", subjectTopical);
                throw new IllegalArgumentException("Subject invalid: " + subjectTopical);
            }
        }
        Book created = bookService.criarBook(book);
        logger.info("Book created successfully: {}", created);
        return created;
    }

    @Operation(summary = "Search book by ID")
    @GetMapping("/{id}")
    public ResponseEntity<BookDTO> searchBook(@PathVariable Long id) {
        logger.info("Received request to search a book by ID: {}", id);
        BookDTO bookDTO = bookService.searchBook(id);
        logger.info("Found book: {}", bookDTO);
        return ResponseEntity.ok(bookDTO);
    }

    @GetMapping("/subject/{subject}")
    public ResponseEntity<List<BookDTO>> getBooksPorSubject(@PathVariable SubjectTopical subject) {
        List<Book> books = bookService.searchPorSubject(subject);
        if (books.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        List<BookDTO> booksDTO = books.stream().map(BookDTO::new).collect(Collectors.toList());
        return ResponseEntity.ok(booksDTO);
    }

    @Operation(summary = "Edit an existing book")
    @PutMapping("/{id}")
    public Book editBook(@PathVariable Long id, @RequestBody Book editedData) {
        logger.info("Received request for edit book with ID: {}", id);
        Book updated = bookService.editBook(id, editedData);
        logger.info("Book updated com sucesso: {}", updated);
        return updated;
    }

    @Operation(summary = "Seacrh all books")
    @GetMapping
    public List<Book> searchBooks() {
        logger.info("Received request to search all books");
        List<Book> books = bookService.searchBooks();
        logger.info("Found books: {}", books);
        return books;
    }

    @Operation(summary = "Delete um book pelo ID")
    @DeleteMapping("/{id}")
    public void deleteBook(@PathVariable Long id) {
        logger.info("Received request to delete book with ID: {}", id);
        bookService.deleteBook(id);
        logger.info("book with ID {} ​​successfully deleted", id);
    }

    @Operation(summary = "Edit CDU of a book")
    @PutMapping("/{id}/cdu")
    public ResponseEntity<?> editCDU(@PathVariable Long id, @RequestBody CDU newCDU) {
        logger.info("Received request to edit book with ID: {}", id);
        if (newCDU == null || (newCDU.getCode() == null && newCDU.getId() == null)) {
            logger.warn("CDU provided is invalid: {}", newCDU);
            return ResponseEntity.badRequest().body("CDU provided is invalid. Provide a valid code or ID.");
        }
        Book bookUpdated = bookService.editCDU(id, newCDU);
        logger.info("Book CDU with ID {} ​​updated successfully: {}", id, bookUpdated);
        return ResponseEntity.ok(bookUpdated);
    }
}

