'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.createTable('Socios', {
      documento: {
        allowNull: false,        
        primaryKey: true,
        type: Sequelize.STRING
      },      
      nombre:{
        type: Sequelize.STRING
      },
      domicilio:{
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
    await queryInterface.dropTable('Socios');
  }
};