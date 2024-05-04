import Sequelize, { Model } from 'sequelize';

export default class Auto extends Model {
  static init(sequelize) {
    super.init({
      user_id: {
        type: Sequelize.INTEGER,
        defaultValue: null,
        validate: {
          len: {
            args: [1, 255],
            msg: 'The USER_ID field must be between 1 and 255 characters',
          },
        },
      },
      plate: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [7],
            msg: 'The PLATE field must 7 characters',
          },
        },
      },
      brand: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [1, 255],
            msg: 'The BRAND field cannot be empty',
          },
        },
      },
      type: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [1, 255],
            msg: 'The TYPE field cannot be empty',
          },
        },
      },
      model: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [1, 255],
            msg: 'The MODEL field cannot be empty',
          },
        },
      },
      year: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [1, 10],
            msg: 'The YEAR field cannot be empty',
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
    this.hasMany(models.AutoImage, { foreignKey: 'auto_id' });
  }
}
