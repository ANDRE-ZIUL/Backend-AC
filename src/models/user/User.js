import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

export default class User extends Model {
  static init(sequelize) {
    super.init({
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
      surname: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'The SURNAME field must be between 3 and 255 characters',
          },
        },
      },
      cpf: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'The CPF already registered',
        },
        validate: {
          len: {
            args: [3, 255],
            msg: 'The CPF field cannot be empty',
          },
        },
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
        validate: {
          len: {
            args: [0, 11],
            msg: 'The PHONE_NUMBER_2 field must be between 0 and 11 characters',
          },
        },
      },
    }, {
      sequelize,
    });

    this.addHook('beforeSave', async (user) => {
      if (user.password) user.password_hash = await bcryptjs.hash(user.password, 8);
    });
    return this;
  }

  static associate(models) {
    this.hasMany(models.UserImage, { foreignKey: 'user_id' });
    this.hasMany(models.AddressUser, { foreignKey: 'user_id' });
  }

  passwordIsValid(password) {
    return bcryptjs.compare(password, this.password_hash);
  }
}
