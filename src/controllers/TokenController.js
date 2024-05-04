import jwt from 'jsonwebtoken';
import User from '../models/user/User';
import ServiceProvider from '../models/service-provider/ServiceProvider';

class TokenController {
  async store(req, res) {
    const { payload } = req.body;

    if (!payload) return res.status(401).json({ errors: ['Credentials not send'] });

    const { email, password } = payload;

    if (!email || !password) return res.status(401).json({ errors: ['Invalid credentials'] });

    const user = await User.findOne({ where: { email } });

    if (!user) {
      const serviceProvider = await ServiceProvider.findOne({ where: { email } });

      if (!serviceProvider) return res.status(401).json({ errors: ['User not found'] });

      if (!(await serviceProvider.passwordIsValid(password))) {
        return res.status(401).json({
          errors: ['Password is invalid'],
        });
      }

      const {
        id, fantasy_name, role, category_services,
      } = serviceProvider;

      const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRATION,
      });

      return res.json({
        token,
        user: {
          id,
          email,
          fantasy_name,
          category_services,
          role,
        },
      });
    }

    if (!(await user.passwordIsValid(password))) {
      return res.status(401).json({
        errors: ['Password is invalid'],
      });
    }

    const {
      id, name, surname, role,
    } = user;
    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return res.json({
      token,
      user: {
        id,
        name,
        surname,
        role,
      },
    });
  }
}

export default new TokenController();
