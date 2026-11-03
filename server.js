const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const db =  mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_retrogames"
})

//testar a conexão 
db.connect((erro) =>{
    if(erro){
        console.error("Erro ao conectar", erro)
    }else{
        console.log("Conectado ao BD")
    }
})

//listar todos os Jogos
const monstrarJogos  = (req, res) => {
    const sql = "SELECT titulo_jogo, plataforma, desenvolvedora, imagem_url AS imagem, preco FROM jogos"
    db.query(sql,(erro, resultados)=> {
         if(erro){
            return res.status(500).send("Erro ao consulta DB")
        }
        res.send(resultados)
    })
}
//Cadastrar Jogos
const novoJogo = (req, res) =>{
    const{titulo_jogo, plataforma, desenvolvedora, imagem_url, preco}=req.body

    if(titulo_jogo && plataforma && desenvolvedora && imagem_url && preco){
        const sql = "INSERT INTO jogos (titulo_jogo, plataforma, desenvolvedora, imagem_url, preco) VALUES (?, ?, ?, ?, ?)"
        const valores = [titulo_jogo, plataforma, desenvolvedora, imagem_url, preco]

        db.query(sql, valores,(erro, resultado)=>{
            if(erro){
                return res.status(500).send("Erro ao inserir jogo")
            }
            res.send("Jogo cadastrado com Sucesso!")
        })
    }else{
        res.status(400).send("Erro: Preencha todos os campos")
    }
}
//Middlewares

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const porta = 3000

//rotas
app.use("/listar", monstrarJogos)
app.post("/cadastrar", novoJogo)

app.listen(porta,()=>{
    console.log(`Servidor rodando (alegria) porta${porta}`)
})