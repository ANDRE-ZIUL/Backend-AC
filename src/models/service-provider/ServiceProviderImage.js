import Sequelize, { Model } from 'sequelize';
import appConfig from '../../config/appConfig';

export default class ServiceProviderImage extends Model {
  static init(sequelize) {
    super.init({
      service_provider_id: {
        type: Sequelize.INTEGER,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'The field SERVICE_PROVIDER_ID cannot be empty',
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
      tableName: 'service_provider_files',
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.ServiceProvider, { foreignKey: 'service_provider_id' });
  }
}
