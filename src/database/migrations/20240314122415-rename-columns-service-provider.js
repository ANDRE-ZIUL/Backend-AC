/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.renameColumn('services_provider', 'type_user', 'role');
  },

  async down(queryInterface) {
    await queryInterface.renameColumn('services_provider', 'role', 'type_user');
  },
};
