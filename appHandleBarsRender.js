const express = require('express');
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');
const db = require('./database/db');
const session = require('express-session');
const DEBUG = true;
const app = express();
const Cadastros = require('./database/Cadastros');
const produtos = require('./database/produtos');

app.engine('handlebars', engine({ defaultLayout: 'Main' }));
app.set('view engine', 'handlebars');
app.set('views', './views');

// Configuração para servir arquivos estáticos
app.use(express.static('styling'));
// Use o bodyParser para interpretar dados do corpo das requisições
app.use(bodyParser.urlencoded({ extended: true }));

// Sessions
app.use(session({
    secret: "lkxhaodif02f2fhdfj",
    resave: true,
    saveUninitialized: true
}));

// Rota para renderizar a página de início
app.get('/', (req, res) => {
    res.render('inicio', { style: 'inicio.css' });
});

// Rota para renderizar a página de login
app.get('/login', (req, res) => {
    if(req.session.login) {
        res.redirect('/produtos');
    }
    res.render('logins', { style: 'csslogin.css', script: 'jslogin.js' });
});

//Rotap para logout

app.get('/sair', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Erro interno do servidor');
        }
        res.redirect('/');
    });
});


// Rota para adicionar um novo cadastro
app.post("/add-cadastros", function(req, res) {
    Cadastros.create({
        // Supondo que os campos do formulário tenham os atributos "Nome", "Usuario" e "Senha"
        Nome: req.body.Nome,
        Usuario: req.body.Usuario,
        Senha: req.body.Senha
    }).then(function(){
        // Renderiza novamente a página de cadastro com a mensagem de sucesso
        res.render('logins', { mensagemcadastro: "Cadastro realizado com sucesso!" });
    }).catch(function(erro){
        // Se houver um erro, renderiza novamente a página de cadastro com a mensagem de erro
        res.render('logins', { mensagemcadastro: "Erro ao realizar cadastro: " + erro });
    });
});


// Rota para realizar o login
app.post("/add-logins", function(req, res) {
    const usuario = req.body.Usuario;
    const senha = req.body.Senha;
    
    // Consulta ao banco de dados para encontrar um usuário com o mesmo nome de usuário e senha
    Cadastros.findOne({
        where: {
            Usuario: usuario,
            Senha: senha
        }
    }).then(function(resultado) {
        if (resultado) {
            // Usuário encontrado - login bem-sucedido
            req.session.login = true;
            res.redirect('/produtos'); // Redireciona para a página de produtos
        } else {
            // Usuário não encontrado - login falhou
            res.render('logins', { mensagemlogin: "Usuario ou senha incorretos." });
        }
    }).catch(function(erro) {
        // Erro ao executar a consulta
        console.error("Erro ao realizar login:", erro);
        res.status(500).send("Erro interno do servidor");
    });
});


// Rota para a página de produtos (deve ser acessível somente após o login)
app.get('/produtos', (req, res) => {
    const mensagemcadastroproduto = req.query.success;
    const mensagemcadastroprodutoerro = req.query.error;


    if (req.session.login) {
        db.sequelize.query('SELECT * FROM produtos', { type: db.sequelize.QueryTypes.SELECT })
        .then(produtos => {
            console.log('Produtos:', produtos);
            res.render('produtos', { produtos: produtos, mensagemcadastroproduto: mensagemcadastroproduto, mensagemcadastroprodutoerro: mensagemcadastroprodutoerro});
        })}
    else {
        res.redirect('/login'); // Redireciona para a página de login se não estiver logado
    }
});



//Rota para adicionar um novo produto na tabela

app.post("/add-produtos", function(req, res) {
    produtos.create({
        Produto: req.body.produtopost,
        Valor: req.body.valorpost,
        Quantidade: req.body.quantidadepost,
        Fornecedor: req.body.fornecedorpost,
        Descricao: req.body.descricaopost,
    }).then(function() {
        res.redirect('/produtos?success=Cadastro%20de%20Produto%20realizado%20com%20sucesso!')
    }).catch(function(err){
        res.redirect('/produtos?error=Falha%20no%20Cadastro%20de%20Produto!%20' + err)
    })
});


app.post("/apagar-produto", function(req, res) {
    const produtoId = req.body.id;

    produtos.destroy({
        where: {
            id: produtoId
        }
    }).then(function() {
        res.redirect('/produtos?success=Produto%20Apagado%20como%20sucesso!')
    }).catch(function(err){
        res.redirect('/produtos?error=Falha%20ao%20Apagar%20de%20Produto!%20' + err)
    })
});


app.listen(8080, () => {
    console.log('Servidor rodando em http://localhost:8080');
});
