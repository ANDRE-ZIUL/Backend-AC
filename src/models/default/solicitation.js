import Sequelize, { Model } from 'sequelize';

export default class Solicitation extends Model {
  static init(sequelize) {
    super.init({
      user_id: {
        type: Sequelize.INTEGER,
        defaultValue: null,
        validate: {
          len: {
            args: [1, 255],
            msg: 'Field USER_ID cannot be empty',
          },
        },
      },
      title: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [1, 255],
            msg: 'Field TITLE cannot be empty',
          },
        },
      },
      auto_id: {
        type: Sequelize.INTEGER,
        defaultValue: null,
        validate: {
          len: {
            args: [1, 255],
            msg: 'Field AUTO_ID cannot be empty',
          },
        },
      },
      service_category_id: {
        type: Sequelize.INTEGER,
        defaultValue: null,
        validate: {
          len: {
            args: [1, 255],
            msg: 'Field SERVICE_CATEGORY_ID cannot be empty',
          },
        },
      },
      description: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [1, 800],
            msg: 'Field DESCRIPTION cannot be empty',
          },
        },
      },
      bring_the_car: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        validate: {
          len: {
            args: [1, 255],
            msg: 'Field BRING_THE_CAR cannot be empty',
          },
        },
      },
      address_id: {
        type: Sequelize.INTEGER,
        defaultValue: null,
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [1, 255],
            msg: 'Field STATUS cannot be empty',
          },
        },
      },
      service_provider_id: {
        type: Sequelize.INTEGER,
        defaultValue: null,
      },
      service_date: {
        type: Sequelize.DATE,
        defaultValue: null,
      },
      employee_id: {
        type: Sequelize.INTEGER,
        defaultValue: null,
      },
      service_description: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      value_service: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      payment_form_id: {
        type: Sequelize.INTEGER,
        defaultValue: null,
      },
      observation: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      cancelated_at: {
        type: Sequelize.DATE,
        defaultValue: null,
      },
      cancel_description: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      assessment: {
        type: Sequelize.INTEGER,
        defaultValue: null,
      },
      comment: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
    }, {
      sequelize,
    });
    return this;
  }

  static associate(models) {
    this.hasMany(models.SolicitationImage, { foreignKey: 'solicitation_id' });
  }
}
