/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('address_service_providers', 'service_provider_id', {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'services_provider',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },
};
