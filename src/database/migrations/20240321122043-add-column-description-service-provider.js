/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('services_provider', 'description', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('services_provider', 'phone_number_2', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('services_provider', 'description');
    await queryInterface.removeColumn('services_provider', 'phone_number_2');
  },
};
