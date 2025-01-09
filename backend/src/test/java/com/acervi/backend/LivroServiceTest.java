// package com.acervi.backend;

// import com.acervi.backend.model.CDU;
// import com.acervi.backend.model.Livro;
// import com.acervi.backend.repository.LivroRepository;
// import com.acervi.backend.service.LivroService;

// import org.junit.jupiter.api.Test;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.context.SpringBootTest;

// import static org.assertj.core.api.Assertions.assertThat;

// @SpringBootTest
//@ActiveProfiles("test")
// class LivroServiceTest {

//     @Autowired
//     private LivroService livroService;

//     @Autowired
//     private LivroRepository livroRepository;

//     @Test
//     void testCriarLivroEValidarPersistencia() {
//         // Cria uma CDU
//         CDU cdu = new CDU();
//         cdu.setCodigo("821(73)-31");
//         cdu.setDescricao("Literatura americana – Romance");

//         // Cria um livro
//         Livro livro = new Livro();
//         livro.setCdu(cdu);
//         livro.setTituloPrincipal[("O Sol é Para Todos")];
//         livro.setDescricaoFisica(null); // Simule a descrição física
//         livro.setDistribuicao(null); // Simule a distribuição

//         // Salva o livro no banco
//         Livro livroSalvo = livroService.criarLivro(livro);

//         // Busca o livro salvo do banco de dados
//         Livro livroDoBanco = livroRepository.findById(livroSalvo.getId()).orElse(null);

//         // Verifica se os dados foram persistidos corretamente
//         assertThat(livroDoBanco).isNotNull();
//         assertThat(livroDoBanco.getTituloPrincipal()).isEqualTo("O Sol é Para Todos");
//         assertThat(livroDoBanco.getCdu().getCodigo()).isEqualTo("821(73)-31");
//         assertThat(livroDoBanco.getCdu().getDescricao()).isEqualTo("Literatura americana – Romance");
//     }
// }
