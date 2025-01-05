// package com.acervi.backend;

// import com.acervi.backend.model.CDU;
// import com.acervi.backend.model.Cutter;
// import com.acervi.backend.model.DescricaoFisica;
// import com.acervi.backend.model.Distribuicao;
// import com.acervi.backend.model.Livro;
// import com.acervi.backend.model.TituloPrincipal;
// import com.acervi.backend.repository.LivroRepository;

// import org.junit.jupiter.api.Test;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.context.SpringBootTest;
// import org.springframework.transaction.annotation.Transactional;

// import java.util.List;

// import static org.junit.jupiter.api.Assertions.assertEquals;
// import static org.junit.jupiter.api.Assertions.assertNotNull;

// @SpringBootTest
// @Transactional
// public class LivroRepositoryTest {

//     @Autowired
//     private LivroRepository livroRepository;

//     @Test
//     public void testSalvarLivro() {
//         Livro livro = new Livro();

//         CDU cdu = new CDU();
//         cdu.setCodigo("821.134.3(569.4)-31");
//         cdu.setDescricao("Descrição do CDU");
//         livro.setCdu(cdu);

//         Cutter cutter = new Cutter();
//         cutter.setCodigo("C123");
//         livro.setCutter(cutter);

//         Distribuicao distribuicao = new Distribuicao();
//         distribuicao.setMarc260Editora("Editora ABC");
//         distribuicao.setMarc260Data(2023);
//         livro.setDistribuicao(distribuicao);

//         DescricaoFisica descricaoFisica = new DescricaoFisica();
//         descricaoFisica.setMarc300Páginas("200 p.");
//         descricaoFisica.setMarc300Volumes(1);
//         livro.setDescricaoFisica(descricaoFisica);

//         TituloPrincipal tituloPrincipal = new TituloPrincipal();
//         tituloPrincipal.setMarc245TituloPrincipal("Título do Livro");
//         livro.setTituloPrincipal(tituloPrincipal);

//         Livro salvo = livroRepository.save(livro);
//         assertNotNull(salvo.getId(), "O ID do livro salvo não pode ser nulo.");

//         List<Livro> livros = livroRepository.findAll();
//         assertEquals(2, livros.size(), "Deve haver exatamente 1 livro no banco de dados.");
//         Livro livroBanco = livros.get(0);
//         assertEquals("821.134.3(569.4)-31", livroBanco.getCdu().getCodigo());
//         assertEquals("Descrição do CDU", livroBanco.getCdu().getDescricao());
//         assertEquals("C123", livroBanco.getCutter().getCodigo());
//         assertEquals("Editora ABC", livroBanco.getDistribuicao().getMarc260Editora());
//         assertEquals(2023, livroBanco.getDistribuicao().getMarc260Data());
//         assertEquals("200 p.", livroBanco.getDescricaoFisica().getMarc300Páginas());
//         assertEquals(1, livroBanco.getDescricaoFisica().getMarc300Volumes());
//         assertEquals("Título do Livro", livroBanco.getTituloPrincipal().getMarc245TituloPrincipal());

//     System.out.println("CDU código antes de salvar: " + cdu.getCodigo());
//     System.out.println("CDU código salvo: " + salvo.getCdu().getCodigo());

//     }
// }
