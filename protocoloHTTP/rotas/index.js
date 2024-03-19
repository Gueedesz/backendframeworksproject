const express = require ("express");
//instancia uma function do express
const app = express();

app.get("/", function(req, res){
    res.sendFile(__dirname + "/src/index.html") // informacao que a pagina home recebe
});

app.get("/login", function(req, res){
    res.sendFile(__dirname + "/src/login.html") // informacao que a pagina home recebe
});


app.get("/cadastro", function(req, res){
    res.sendFile(__dirname + "/src/cadastro.html") // informacao que a pagina home recebe
});


app.get("/painel", function(req, res){
    res.sendFile(__dirname + "/src/painel.html") // informacao que a pagina home recebe
});

app.get("/sobre", function(req, res){
    res.sendFile(__dirname + "/src/sobre.html") // informacao que a pagina home recebe
});

app.listen(8080);

console.log("Servidor rodando na porta 8080");
