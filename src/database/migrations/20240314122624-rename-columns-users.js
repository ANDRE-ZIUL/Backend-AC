/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.renameColumn('users', 'type_user', 'role');
  },

  async down(queryInterface) {
    await queryInterface.renameColumn('users', 'role', 'type_user');
  },
};
