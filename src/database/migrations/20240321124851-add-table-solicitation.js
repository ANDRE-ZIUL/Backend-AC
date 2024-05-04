/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('solicitations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      auto_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      service_category_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      bring_the_car: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      address_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      service_provider_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      service_date: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      employee_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      service_description: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      value_service: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      payment_form_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      observation: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      cancelated_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      cancel_description: {
        allowNull: true,
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
    await queryInterface.dropTable('solicitations');
  },
};
