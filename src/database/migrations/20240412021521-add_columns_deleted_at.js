/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('address_users', 'deleted_at', {
      type: Sequelize.DATE,
      allowNull: true,
    });
    await queryInterface.addColumn('address_service_providers', 'deleted_at', {
      type: Sequelize.DATE,
      allowNull: true,
    });
    await queryInterface.addColumn('employees', 'deleted_at', {
      type: Sequelize.DATE,
      allowNull: true,
    });
    await queryInterface.addColumn('autos', 'deleted_at', {
      type: Sequelize.DATE,
      allowNull: true,
    });
    await queryInterface.addColumn('payment_forms', 'deleted_at', {
      type: Sequelize.DATE,
      allowNull: true,
    });
    await queryInterface.addColumn('service_categories', 'deleted_at', {
      type: Sequelize.DATE,
      allowNull: true,
    });
    await queryInterface.addColumn('auto_files', 'deleted_at', {
      type: Sequelize.DATE,
      allowNull: true,
    });
    await queryInterface.addColumn('user_files', 'deleted_at', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('address_users', 'deleted_at');
    await queryInterface.removeColumn('address_service_providers', 'deleted_at');
    await queryInterface.removeColumn('employees', 'deleted_at');
    await queryInterface.removeColumn('autos', 'deleted_at');
    await queryInterface.removeColumn('payment_forms', 'deleted_at');
    await queryInterface.removeColumn('service_categories', 'deleted_at');
    await queryInterface.removeColumn('auto_files', 'deleted_at');
    await queryInterface.removeColumn('user_files', 'deleted_at');
  },
};
