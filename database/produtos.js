const db = require("./db");

const produtos = db.sequelize.define('produtos', {
    Produto: {
        type: db.Sequelize.STRING
    },
    Valor: {
        type: db.Sequelize.INTEGER
    },
    Quantidade: {
        type: db.Sequelize.INTEGER
    },
    Fornecedor: {
        type: db.Sequelize.STRING
    },
    Descricao: {
        type: db.Sequelize.STRING
    },
});

 //produtos.sync({ force: true }).then(() => {
    //console.log('Tabela Produtos sincronizada.');
// }).catch(err => {
    //console.error('Erro ao sincronizar tabela Produtos:', err);
 //});

module.exports = produtos;