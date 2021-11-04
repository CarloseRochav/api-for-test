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
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
        updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Socios');
  }
};