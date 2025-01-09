package com.acervi.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.acervi.backend.model.AssuntoTopico;
import com.acervi.backend.model.Livro;

@Repository
public interface LivroRepository extends JpaRepository<Livro, Long> {

    // Consulta para buscar livros por autor
    @Query("SELECT l FROM Livro l JOIN l.entradaPrincipal e WHERE e.marc100NomePessoalEntidadeEventoTitulo = :nome")
    List<Livro> findByEntradaPrincipal(@Param("nome") String nome);

    // Consulta para buscar livros por assunto
    @Query("SELECT l FROM Livro l JOIN l.assuntoTopico a WHERE a = :assuntoTopico")
    List<Livro> findByAssuntoTopico(@Param("assuntoTopico") AssuntoTopico assuntoTopico);

    //Consulta para buscar livros por título da série
    @Query("SELECT l FROM Livro l JOIN l.entradaSecundariaSerie e WHERE e.marc800TituloSerieColecao = :tituloSerie")
    List<Livro> findbyEntradaSecundariaSerie(@Param("tituloSerie") String tituloSerie);

}

