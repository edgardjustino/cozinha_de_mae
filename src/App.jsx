import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';

// Importando a imagem do logo que salvamos na pasta assets
import logoImg from './assets/logo_cdm.jpeg';

const PLANILHA_URL = 'https://docs.google.com/spreadsheets/d/1HO1dakdasiqNO2ge7BrhY2qSxC1kpMmhRBxEdMz37hw/gviz/tq?tqx=out:csv';

function App() {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // Busca os dados da tabela assim que a página carrega
  useEffect(() => {
    Papa.parse(PLANILHA_URL, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        // Filtra para garantir que só mostramos produtos válidos e disponíveis
        const produtosAtivos = results.data.filter((produto) => {
          const idLimpo = produto.id?.trim();
          const disponivelLimpo = produto.disponivel?.trim().toUpperCase();
          return idLimpo && (disponivelLimpo === 'SIM' || !disponivelLimpo);
        });
        setProdutos(produtosAtivos);
        setCarregando(false);
      },
      error: (error) => {
        console.error("Erro ao ler a planilha:", error);
        setCarregando(false);
      }
    });
  }, []);

  return (
    <div>
      {/* ========================================================
         BARRA SUPERIOR (HEADER) - Com o Logo e os links do menu
         ======================================================== */}
      <header className="barra-superior">
        <div className="logo-container">
          {/* Exibe a imagem real do logo que você importou */}
          <img src={logoImg} alt="Logo Cozinha de Mãe" className="logo-imagem" />
          <span className="logo-texto">Cozinha de Mãe</span>
        </div>
        <nav className="menu-navegacao">
          <a href="#home">Início</a>
          <a href="#sobre">História</a>
          <a href="#produtos">Produtos</a>
        </nav>
      </header>

      {/* ========================================================
         CONTEÚDO PRINCIPAL (Como você faria no HTML tradicional)
         ======================================================== */}
      <main style={{ marginTop: '90px' }}> {/* Margem para o conteúdo não ficar sob o menu fixo */}
        
        {/* Seção Início */}
        {/* Substitua a tag <section id="home"> antiga por esta estruturada: */}
<section id="home" className="secao-banner">
  <div className="banner-conteudo">
    <span className="badge-sustentavel">🌱 Cozinha Sustentável & Afeto</span>
    <h1>Doces artesanais que transformam e abraçam</h1>
    <p>
      Geleias e bolos feitos à mão pela Dona Marinete na Rocinha, usando ingredientes selecionados e combatendo o desperdício de alimentos.
    </p>
    <div className="banner-botoes">
      <a href="#produtos" className="btn-principal">Ver Cardápio 😋</a>
      <a href="#sobre" className="btn-secundario">Nossa História</a>
    </div>
  </div>
</section>

        {/* Seção Sobre */}
        <section id="sobre" className="secao-texto">
          <h2>Nossa História 💚</h2>
          <p>
            O Projeto Cozinha de Mãe, liderado pela Marinete na Rocinha, transforma frutas e alimentos de excelente qualidade, que seriam descartados por questões estéticas, em geleias deliciosas e bolos fofinhos.
          </p>
        </section>

        {/* Seção Produtos (A vitrine que lê a planilha) */}
        <section id="produtos" className="secao-produtos">
          <h2>Nossas Delícias 🧁</h2>
          {carregando ? (
            <p>Buscando produtos na planilha... ⏳</p>
          ) : (
            <div className="grid-produtos">
              {produtos.map((produto) => (
                <div key={produto.id} className="card-produto">
                  <div className="produto-img-container">
                    {produto.imagem_url ? (
                      <img src={produto.imagem_url} alt={produto.nome} className="produto-img" />
                    ) : (
                      <div className="sem-foto">🧁</div>
                    )}
                  </div>
                  <div className="produto-info">
                    <span className="produto-categoria">{produto.categoria}</span>
                    <h3 className="produto-nome">{produto.nome}</h3>
                    <p className="produto-desc">{produto.descricao}</p>
                    <div className="produto-footer">
                      <span className="produto-preco">
                        R$ {parseFloat(produto.preco || 0).toFixed(2).replace('.', ',')}
                      </span>
                      <button className="btn-add">Adicionar 🛒</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </main>

      {/* ========================================================
         RODAPÉ
         ======================================================== */}
      <footer className="rodape">
        <p>&copy; 2026 Cozinha de Mãe. Feito com amor na Rocinha, RJ.</p>
      </footer>
    </div>
  );
}

export default App;
