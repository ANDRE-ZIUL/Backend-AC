/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('solicitations', 'assessment', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn('solicitations', 'comment', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('solicitations', 'assessment');
    await queryInterface.removeColumn('solicitations', 'comment');
  },
};
