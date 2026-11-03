const API_URL = "http://localhost:3000"

const modalCadastro = document.getElementById("modalCadastro");
const btnCadastrar = document.getElementById("btnCadastrar");
const btnCancelar = document.getElementById("btnCancelar");
const formJogo = document.getElementById("formJogo");
const listarJogos = document.getElementById("listarJogos");
const mensagemVazia = document.getElementById("mensagemVazia");

btnCadastrar.addEventListener("click", () => {
    modalCadastro.showModal();
});
btnCancelar.addEventListener("click", () => {
    modalCadastro.close();
    formJogo.reset();
})
//Carregar os Jogos do BD(GET)
async function carregarJogos(){
    try{
        const resposta = await fetch(API_URL + '/listar')
        const jogos = await resposta.json()

        listarJogos.innerHTML =""

        if(jogos.length == 0){
            mensagemVazia.hidden = false 
            listarJogos.appendChild(mensagemVazia)
            return
        }

        mensagemVazia.hidden = true

        jogos.forEach(jogo => {
            criarCard(titulo = jogo.titulo_jogo, plataforma = jogo.plataforma, preco = jogo.preco, imagem = jogo.imagem)
        });
    }catch(erro){
        console.error("Erro ao carregar jogos", erro)
        alert("Não foi possível conectar ao servidor")
    }

}
//Cadastrar novo jogo (POST)
formJogo.addEventListener("submit", async (evento)=> {
    evento.preventDefault()

    const novoJogo = {
        titulo_jogo: document.getElementById("titulo_jogo").value.trim(),
        plataforma: document.getElementById("plataforma").value.trim(),
        desenvolvedora: document.getElementById("desenvolvedora").value.trim(),
        imagem_url: document.getElementById("imagem").value.trim(),
        preco: Number(document.getElementById("preco").value)
    }


    try {
        const resposta = await fetch(API_URL + '/cadastrar', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(novoJogo)
        })
        if (resposta.ok) {
            
            formJogo.reset()
            modalCadastro.close()
            carregarJogos()
        }else{
            alert("Erro ao salvar jogo. Verifique BD")
        }
    }catch(erro){
        console.error("Erro na requisição", erro)
        alert("Erro de conexão com o servidor")
    }

}) 
function criarCard(titulo_jogo, plataforma, preco, imagem) {
    mensagemVazia.hidden = true;
    const card = document.createElement("article");
    card.classList.add("card-jogo");
    const capa = document.createElement("div");
    capa.classList.add("capa");
    const imagemCapa = document.createElement("img");
    imagemCapa.src = imagem;
    capa.appendChild(imagemCapa);
    const info = document.createElement("div");
    info.classList.add("info-jogo");
    const titulo = document.createElement("h3");
    titulo.textContent = titulo_jogo;
    const pPlataforma = document.createElement("p");
    pPlataforma.textContent = "Plataforma: " + plataforma;
    const valor = document.createElement("strong");
    valor.classList.add("preco");
    valor.textContent = Number(preco).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    info.append(titulo, pPlataforma, valor);
    card.append(capa, info);
    listarJogos.appendChild(card);
}
carregarJogos()