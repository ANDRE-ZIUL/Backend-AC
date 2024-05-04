/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.removeColumn('autos', 'conservation_state');
  },

  async down(queryInterface) {
    await queryInterface.addColumn('autos', 'conservation_state');
  },
};
