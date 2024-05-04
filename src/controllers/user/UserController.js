import bcryptjs from 'bcryptjs';
import User from '../../models/user/User';
import UserImage from '../../models/user/UserImage';

class UserController {
  async index(req, res) {
    try {
      const users = await User.findAll({ attributes: ['id', 'name', 'surname', 'email', 'cpf', 'phone_number', 'phone_number'] });
      return res.json(users);
    } catch (e) {
      return res.json({
        error: e.errors.map((error) => error.message),
      });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findOne({
        where: { id: id },
        attributes: ['id', 'name', 'surname', 'email', 'cpf', 'phone_number', 'phone_number_2'],
        include: [{
          model: UserImage,
          attributes: ['url', 'filename'],
          order: [['created_at', 'DESC']],
          limit: 1,
        }],
      });

      if (!user) {
        return res.status(404).json({
          error: 'User not found',
        });
      }

      return res.json(user);
    } catch (e) {
      return res.status(500).json({
        error: e.message,
      });
    }
  }

  async create(req, res) {
    try {
      const {
        name, surname, cpf, email, password, phone_number, role,
      } = req.body;

      const newUser = await User.create({
        name: name,
        surname: surname,
        cpf: cpf,
        email: email,
        password: password,
        phone_number: phone_number,
        role: role,
      });

      res.json(newUser.id, newUser.name, newUser.email);
    } catch (e) {
      res.status(400).json({
        error: e.errors.map((error) => error.message),
      });
    }
  }

  async update(req, res) {
    try {
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(404).json({
          error: ['User not found'],
        });
      }

      const updatedData = await user.update(req.body);

      const { id, name, email } = updatedData;

      return res.json(id, name, email);
    } catch (e) {
      console.log('erro = ', e);
      return res.status(401).json({
        error: e.errors.map((error) => error.message),
      });
    }
  }

  async updatePassword(req, res) {
    try {
      const { id } = req.params;
      const { oldPassword, newPassword } = req.body;

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({
          error: ['User not found'],
        });
      }

      const isMatch = await bcryptjs.compare(oldPassword, user.password_hash);
      if (!isMatch) return res.status(403).json({ error: ['Password inválid'] });

      const hashedPassword = await bcryptjs.hash(newPassword, 8);
      await user.update({ password_hash: hashedPassword });

      return res.status(200).json(['Password updated']);
    } catch (e) {
      return res.status(400).json({
        error: [e],
      });
    }
  }

  async delete(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(404).json({
          error: ['User not found'],
        });
      }

      await user.destroy();

      return res.json({
        message: 'User deleted',
      });
    } catch (e) {
      return res.json({
        error: e.errors.map((error) => error.message),
      });
    }
  }
}

export default new UserController();
