const db = require("./db");

const Logins = db.sequelize.define('logins', {
    Usuario: {
        type: db.Sequelize.STRING
    },
    Senha: {
        type: db.Sequelize.STRING
    },
});

 //Logins.sync({ force: true }).then(() => {
   // console.log('Tabela Logins sincronizada.');
 //}).catch(err => {
   // console.error('Erro ao sincronizar tabela Logins:', err);
// });

module.exports = Logins;