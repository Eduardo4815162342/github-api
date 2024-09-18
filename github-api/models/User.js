const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');  // Conexão com o banco de dados

// Definição do modelo de Usuário
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  githubId: {
    type: DataTypes.INTEGER,
    unique: true,
  },
  login: DataTypes.STRING,
  url: DataTypes.STRING,
  type: DataTypes.STRING,
  name: DataTypes.STRING,
  location: DataTypes.STRING,
  email: DataTypes.STRING,
  bio: DataTypes.TEXT,
  publicRepos: DataTypes.INTEGER,
  followers: DataTypes.INTEGER,
  following: DataTypes.INTEGER,
  createdAt: DataTypes.DATE,
});

module.exports = User;
