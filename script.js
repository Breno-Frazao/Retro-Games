
const modalCadastro = document.getElementById("modalCadastro");
const btnCadastrar = document.getElementById("btnCadastrar");
const btnCancelar = document.getElementById("btnCancelar");
const formJogo = document.getElementById("formDisco");
const listarJogos = document.getElementById("listarDiscos");
const mensagemVazia = document.getElementById("mensagemVazia");

btnCadastrar.addEventListener("click", () => {
    modalCadastro.showModal();
});

btnCancelar.addEventListener("click", () => {
    modalCadastro.close();
    formJogo.reset();
});

function criarCard(titulo, desenvolvedora, genero, preco, imagem) {
    mensagemVazia.hidden = true;

    const card = document.createElement("article");
    card.classList.add("card-disco");

    const capa = document.createElement("div");
    capa.classList.add("capa");

    const imagemCapa = document.createElement("img");
    imagemCapa.src = imagem;
    imagemCapa.alt = titulo;

    capa.appendChild(imagemCapa);

    const info = document.createElement("div");
    info.classList.add("info-disco");
    info.style.padding = "15px";

    const nome = document.createElement("h3");
    nome.textContent = titulo;

    const desenvolvedor = document.createElement("p");
    desenvolvedor.textContent = "Desenvolvedor: " + desenvolvedora;

    const tipo = document.createElement("p");
    tipo.textContent = "Gênero: " + genero;

    const valor = document.createElement("p");
    valor.classList.add("preco");
    valor.textContent = Number(preco).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    info.append(nome, desenvolvedor, tipo, valor);
    card.append(capa, info);

    listarJogos.appendChild(card);
}

formJogo.addEventListener("submit", (event) => {
    event.preventDefault();

    const titulo = document.getElementById("album").value;
    const desenvolvedora = document.getElementById("artista").value;
    const genero = document.getElementById("genero").value;
    const imagem = document.getElementById("imagem").value;
    const preco = document.getElementById("preco").value;

    criarCard(titulo, desenvolvedora, genero, preco, imagem);

    modalCadastro.close();
    formJogo.reset();
});
