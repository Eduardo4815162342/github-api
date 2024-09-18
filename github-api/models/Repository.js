const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');  // Conexão com o banco de dados
const User = require('./User');  // Importa o modelo User para configurar as associações

// Definição do modelo de Repositório
const Repository = sequelize.define('Repository', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  githubId: {
    type: DataTypes.INTEGER,
    unique: true,
  },
  name: DataTypes.STRING,
  url: DataTypes.STRING,
  description: DataTypes.TEXT,
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
  language: DataTypes.STRING,
  visibility: DataTypes.STRING,
  forksCount: DataTypes.INTEGER,
  openIssuesCount: DataTypes.INTEGER,
  watchersCount: DataTypes.INTEGER,
});

// Definir a associação de repositórios para usuários (pertence a um usuário)
Repository.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = Repository;
