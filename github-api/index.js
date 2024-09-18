const express = require('express');
const sequelize = require('./config/database');  // Conexão com o banco de dados
const { User, Repository } = require('./models');  // Importa os modelos de usuário e repositório

const app = express();
app.use(express.json());  // Middleware para lidar com JSON

app.use('/api/users', require('./routes/userRoutes'));  // Usar rotas definidas para usuários

// Sincroniza os modelos com o banco de dados e inicia o servidor
sequelize.sync({ force: false }).then(() => {
  console.log('Database connected');
  app.listen(3000, () => {
    console.log('Server running on port 3000');
  });
});
