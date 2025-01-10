package com.acervi.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.acervi.backend.model.SubjectTopical;
import com.acervi.backend.model.Book;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    // Consulta para search books por autor
    @Query("SELECT l FROM Book l JOIN l.entryMain e WHERE e.marc100PersonalCorporateMeeting = :nome")
    List<Book> findByEntryMain(@Param("nome") String nome);

    // Consulta para search books por subject
    @Query("SELECT l FROM Book l JOIN l.subjectTopical a WHERE a = :subjectTopical")
    List<Book> findBySubjectTopical(@Param("subjectTopical") SubjectTopical subjectTopical);

    //Consulta para search books por título da série
    @Query("SELECT l FROM Book l JOIN l.entryAddedSerie e WHERE e.marc800TitleCollectionSeries = :titleSerie")
    List<Book> findbyEntryAddedSerie(@Param("titleSerie") String titleSerie);

}
