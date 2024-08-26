const { Sequelize, DataTypes } = require('sequelize');

// Configura a conexão com o SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'  // O arquivo que armazenará o banco de dados
});

// Define o modelo Message para armazenar as mensagens recebidas
const Message = sequelize.define('Message', {
  sender: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

// Sincroniza o modelo com o banco de dados (cria a tabela se não existir)
sequelize.sync();

// Exporta o modelo para uso em outros arquivos
module.exports = { Message };
