/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('solicitations', 'user_id', {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
    });

    await queryInterface.changeColumn('solicitations', 'auto_id', {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'autos',
        key: 'id',
      },
      onUpdate: 'CASCADE',
    });

    await queryInterface.changeColumn('solicitations', 'service_category_id', {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'service_categories',
        key: 'id',
      },
      onUpdate: 'CASCADE',
    });

    await queryInterface.changeColumn('solicitations', 'address_id', {
      allowNull: true,
      type: Sequelize.INTEGER,
      references: {
        model: 'address_users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
    });

    await queryInterface.changeColumn('solicitations', 'service_provider_id', {
      allowNull: true,
      type: Sequelize.INTEGER,
      references: {
        model: 'services_provider',
        key: 'id',
      },
      onUpdate: 'CASCADE',
    });

    await queryInterface.changeColumn('solicitations', 'employee_id', {
      allowNull: true,
      type: Sequelize.INTEGER,
      references: {
        model: 'employees',
        key: 'id',
      },
      onUpdate: 'CASCADE',
    });

    await queryInterface.changeColumn('solicitations', 'payment_form_id', {
      allowNull: true,
      type: Sequelize.INTEGER,
      references: {
        model: 'payment_forms',
        key: 'id',
      },
      onUpdate: 'CASCADE',
    });
  },
};
