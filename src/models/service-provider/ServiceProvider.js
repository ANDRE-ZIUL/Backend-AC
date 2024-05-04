import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

export default class ServiceProvider extends Model {
  static init(sequelize) {
    super.init({
      social_reason: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'The SOCIAL_REASON field must be between 1 and 255 characters',
          },
        },
      },
      fantasy_name: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'The FANTASY_NAME field must be between 3 and 255 characters',
          },
        },
      },
      cpf_cnpj: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'The CPF/CNPJ already registered',
        },
        validate: {
          len: {
            args: [11, 14],
            msg: 'The CPF_CNPJ field must be between 11 and 14 characters',
          },
        },
      },
      phone_number: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [10, 11],
            msg: 'The PHONE_NUMBER field must be between 10 and 11 characters',
          },
        },
      },
      phone_number_2: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'The Email already registered',
        },
        validate: {
          isEmail: {
            msg: 'Email is invalid',
          },
        },
      },
      password_hash: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      password: {
        type: Sequelize.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            args: [8, 50],
            msg: 'The PASSWORD field must be between 8 and 50 characters',
          },
        },
      },
      role: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 30],
            msg: 'The ROLE field must be between 3 and 30 characters',
          },
        },
      },
      category_services: {
        type: Sequelize.JSON,
        defaultValue: null,
        validate: {
          len: {
            msg: 'The CATEGORY_SERVICES field cannot be null',
          },
        },
      },
      description: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
    }, {
      sequelize,
      tableName: 'services_provider',
    });

    this.addHook('beforeSave', async (serviceProvider) => {
      if (serviceProvider.password) serviceProvider.password_hash = await bcryptjs.hash(serviceProvider.password, 8);
    });
    return this;
  }

  static associate(models) {
    this.hasMany(models.ServiceProviderImage, { foreignKey: 'service_provider_id' });
    this.hasMany(models.AddressServiceProvider, { foreignKey: 'service_provider_id' });
  }

  passwordIsValid(password) {
    return bcryptjs.compare(password, this.password_hash);
  }
}
