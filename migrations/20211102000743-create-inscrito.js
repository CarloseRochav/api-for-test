'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Inscritos', {
      documentoSocio: {
        allowNull: false,        
        primaryKey: true,
        type: Sequelize.STRING
      },      
      numero: {
        type: Sequelize.INTEGER,
        allowNull: false,        
        primaryKey: true,        
      },
      matricula: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Inscritos');
  }
};