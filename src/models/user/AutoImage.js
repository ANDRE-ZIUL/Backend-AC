import Sequelize, { Model } from 'sequelize';
import appConfig from '../../config/appConfig';

export default class Image extends Model {
  static init(sequelize) {
    super.init({
      auto_id: {
        type: Sequelize.INTEGER,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'The field AUTO_ID cannot be empty',
          },
        },
      },
      user_id: {
        type: Sequelize.INTEGER,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'The field USER_ID cannot be empty',
          },
        },
      },
      filename: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'The field FILENAME cannot be empty',
          },
        },
      },
      path: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'The field PATH cannot be empty',
          },
        },
      },
      deleted_at: {
        type: Sequelize.DATE,
        defaultValue: null,
      },
      url: {
        type: Sequelize.VIRTUAL,
        get() {
          return `${appConfig.url}/images/${this.getDataValue('filename')}`;
        },
      },
    }, {
      sequelize,
      tableName: 'auto_files',
      modelName: 'AutoImage',
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Auto, { foreignKey: 'auto_id' });
  }
}
