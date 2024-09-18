const axios = require('axios');
const { User, Repository } = require('../models');  // Importar os modelos de forma centralizada

const GITHUB_API_BASE = 'https://api.github.com';

// Função para buscar os dados do usuário no GitHub
const getUserFromGitHub = async (username) => {
  const { data } = await axios.get(`${GITHUB_API_BASE}/users/${username}`, {
    headers: {
      'Accept': 'application/vnd.github.v3+json',
    }
  });
  return data;
};

// Função para buscar os repositórios do usuário no GitHub
const getReposFromGitHub = async (username) => {
  const { data } = await axios.get(`${GITHUB_API_BASE}/users/${username}/repos`, {
    headers: {
      'Accept': 'application/vnd.github.v3+json',
    }
  });
  return data;
};

// Método para criar um novo usuário e seus repositórios no banco de dados
exports.createUser = async (req, res) => {
  try {
    const { username } = req.body;
    
    // Buscar dados do usuário no GitHub
    const gitHubUser = await getUserFromGitHub(username);
    
    // Buscar repositórios do usuário no GitHub
    const gitHubRepos = await getReposFromGitHub(username);

    // Criar o usuário no banco de dados
    const user = await User.create({
      githubId: gitHubUser.id,
      login: gitHubUser.login,
      url: gitHubUser.html_url,
      type: gitHubUser.type,
      name: gitHubUser.name,
      location: gitHubUser.location,
      email: gitHubUser.email,
      bio: gitHubUser.bio,
      publicRepos: gitHubUser.public_repos,
      followers: gitHubUser.followers,
      following: gitHubUser.following,
      createdAt: gitHubUser.created_at,
    });

    // Criar os repositórios associados ao usuário
    for (const repo of gitHubRepos) {
      await Repository.create({
        githubId: repo.id,
        name: repo.name,
        url: repo.html_url,
        description: repo.description,
        createdAt: repo.created_at,
        updatedAt: repo.updated_at,
        language: repo.language,
        visibility: repo.visibility,
        forksCount: repo.forks_count,
        openIssuesCount: repo.open_issues_count,
        watchersCount: repo.watchers_count,
        userId: user.id,  // Atribuir o userId corretamente para associar ao usuário
      });
    }

    // Retornar o usuário criado como resposta
    return res.json(user);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Método para buscar um usuário do banco de dados e incluir seus repositórios
exports.getUser = async (req, res) => {
  try {
    // Busca o usuário no banco de dados pelo login
    const user = await User.findOne({
      where: { login: req.params.username },
      include: { model: Repository, as: 'repositories' },  // Inclua os repositórios com o alias correto
    });
    
    // Verifica se o usuário existe
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    
    // Retorna o usuário e seus repositórios
    return res.json(user);
    
  } catch (err) {
    // Em caso de erro, retorna a mensagem de erro
    return res.status(500).json({ error: err.message });
  }
};

// Método para atualizar um usuário no banco de dados
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, bio } = req.body;
    
    // Atualiza as informações do usuário
    const user = await User.update(
      { name, location, bio },
      { where: { id } }
    );
    
    // Retorna a resposta com o usuário atualizado
    return res.json(user);
  } catch (err) {
    // Em caso de erro, retorna a mensagem de erro
    return res.status(500).json({ error: err.message });
  }
};

// Método para deletar um usuário do banco de dados
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Deleta o usuário do banco de dados
    await User.destroy({ where: { id } });
    
    // Retorna a resposta de exclusão
    return res.json({ message: 'Usuário excluído' });
  } catch (err) {
    // Em caso de erro, retorna a mensagem de erro
    return res.status(500).json({ error: err.message });
  }
};
