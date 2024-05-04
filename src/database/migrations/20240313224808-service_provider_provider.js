/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('services_provider', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      social_reason: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      fantasy_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      cpf_cnpj: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      phone_number: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      password_hash: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      category_services: {
        allowNull: false,
        type: Sequelize.JSON,
      },
      type_user: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('services_provider');
  },
};
