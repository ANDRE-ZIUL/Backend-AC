import Sequelize, { Model } from 'sequelize';

export default class AddressServiceProvider extends Model {
  static init(sequelize) {
    super.init({
      service_provider_id: {
        type: Sequelize.INTEGER,
        defaultValue: '',
        validate: {
          len: {
            args: [1, 255],
            msg: 'The SERVICE_PROVIDER_ID field must be between 1 and 255 characters',
          },
        },
      },
      name: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'The NAME field must be between 3 and 255 characters',
          },
        },
      },
      zip_code: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [8],
            msg: 'The ZIP_CODE field must be 8 characters',
          },
        },
      },
      street: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [2, 255],
            msg: 'The STREET field must be between 3 and 255 characters',
          },
        },
      },
      number: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [2, 255],
            msg: 'The NUMBER field must be between 3 and 255 characters',
          },
        },
      },
      district: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [2, 255],
            msg: 'The DISTRICT field must be between 3 and 255 characters',
          },
        },
      },
      complement: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [0, 255],
          },
        },
      },
      city: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [2, 255],
            msg: 'The CITY field must be between 3 and 255 characters',
          },
        },
      },
      uf: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [2],
            msg: 'The UF field must be 2 characters',
          },
        },
      },
      deleted_at: {
        type: Sequelize.DATE,
        defaultValue: null,
      },
    }, {
      sequelize,
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.ServiceProvider, { foreignKey: 'service_provider_id' });
  }
}
