const { Sequelize } = require('sequelize');

// Configuração da conexão com o PostgreSQL
const sequelize = new Sequelize('github_db', 'nomeDoSeuUsuário', 'SenhaDoSeuUsuário', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
