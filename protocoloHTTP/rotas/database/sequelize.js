const Sequelize = require('sequelize');

const sequelize = new Sequelize('vanessa', 'Breno', '123456', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate().then(function () {
    console.log("Conexao realizada com sucesso");
}).catch(function (err) {
    console.log("Erro ao realizar a conexao com DB:" + err);
});

const logins = sequelize.define('logins', {
    usuario: {
        type: Sequelize.STRING,
    },
    senha : {
        type: Sequelize.STRING
    }
});

// comentado para nao substituir tabela ja criada
// logins.sync({force: true});

logins.create({
    usuario: "Guedes",
    senha: "123"
});