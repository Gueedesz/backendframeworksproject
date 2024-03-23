const db = require("./db");

const Cadastros = db.sequelize.define('cadastros', {
    Nome: {
        type: db.Sequelize.STRING
    },

    Usuario: {
        type: db.Sequelize.STRING
    },
    Senha: {
        type: db.Sequelize.STRING
    },
});

 //Cadastros.sync({ force: true }).then(() => {
    //console.log('Tabela Cadastros sincronizada.');
// }).catch(err => {
   // console.error('Erro ao sincronizar tabela Cadastros:', err);
//});

module.exports = Cadastros;