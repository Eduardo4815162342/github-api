const express = require('express');
const { getUser, createUser, deleteUser, updateUser } = require('../controllers/userController');
const router = express.Router();

// Rota para buscar um usuário e seus repositórios
router.get('/:username', getUser);

// Rota para criar um novo usuário
router.post('/', createUser);

// Rota para atualizar um usuário
router.put('/:id', updateUser);

// Rota para deletar um usuário
router.delete('/:id', deleteUser);

module.exports = router;
