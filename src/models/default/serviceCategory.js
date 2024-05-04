import Sequelize, { Model } from 'sequelize';

export default class ServiceCategorie extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [1, 255],
            msg: 'Field NAME cannot be empty',
          },
        },
      },
      deleted_at: {
        type: Sequelize.DATE,
        defaultValue: null,
      },
    }, {
      sequelize,
      tableName: 'service_categories',
    });
    return this;
  }
}
