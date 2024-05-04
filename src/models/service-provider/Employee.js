import Sequelize, { Model } from 'sequelize';

export default class Employee extends Model {
  static init(sequelize) {
    super.init({
      provider_service_id: {
        type: Sequelize.INTEGER,
        defaultValue: '',
        validate: {
          len: {
            args: [1, 255],
            msg: 'The field PROVIDER_SERVICE_ID cannot be empty',
          },
        },
      },
      name: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [1, 255],
            msg: 'The field NAME cannot be empty',
          },
        },
      },
      cpf: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [1, 255],
            msg: 'The field CPF cannot be empty',
          },
        },
      },
      register: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [1, 255],
            msg: 'The field REGISTER cannot be empty',
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
}
