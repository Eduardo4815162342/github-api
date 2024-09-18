const User = require('./User');
const Repository = require('./Repository');

// Definir as associações
User.hasMany(Repository, { foreignKey: 'userId', as: 'repositories' });
Repository.belongsTo(User, { foreignKey: 'userId' });  

module.exports = { User, Repository };
