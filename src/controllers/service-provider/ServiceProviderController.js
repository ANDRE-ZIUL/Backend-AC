import bcryptjs from 'bcryptjs';
import ServiceProvider from '../../models/service-provider/ServiceProvider';
import ServiceProviderImage from '../../models/service-provider/ServiceProviderImage';
import AddressServiceProvider from '../../models/service-provider/AddressServiceProvider';

class ServiceProviderController {
  async index(req, res) {
    try {
      const servicesProviders = await ServiceProvider.findAll({
        attributes: ['id', 'social_reason', 'fantasy_name', 'cpf_cnpj', 'phone_number', 'phone_number_2', 'description', 'email', 'category_services'],
        include: [{
          model: ServiceProviderImage,
          attributes: ['url', 'filename'],
          order: [['created_at', 'DESC']],
          limit: 1,
        }, {
          model: AddressServiceProvider,
          order: [['created_at', 'DESC']],
          limit: 1,
        }],
      });
      return res.json(servicesProviders);
    } catch (e) {
      return res.status(404).json({
        error: e.errors.map((error) => error.message),
      });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(404).json({
          error: ['ID not sent'],
        });
      }

      const serviceProvider = await ServiceProvider.findOne({
        where: { id: id },
        attributes: ['id', 'social_reason', 'fantasy_name', 'cpf_cnpj', 'phone_number', 'phone_number_2', 'description', 'email', 'category_services'],
        include: [{
          model: ServiceProviderImage,
          attributes: ['url', 'filename'],
          order: [['created_at', 'DESC']],
          limit: 1,
        }, {
          model: AddressServiceProvider,
          order: [['created_at', 'DESC']],
          limit: 1,
        }],
      });

      if (!serviceProvider) {
        return res.status(404).json({
          error: ['ServiceProvider not found'],
        });
      }

      return res.json(serviceProvider);
    } catch (e) {
      return res.status(400).json({
        error: e.message,
      });
    }
  }

  async create(req, res) {
    try {
      const {
        social_reason, fantasy_name, cpf_cnpj, phone_number, phone_number_2, description, email, password, role, category_services,
      } = req.body;

      const newServiceProvider = await ServiceProvider.create({
        social_reason: social_reason,
        fantasy_name: fantasy_name,
        cpf_cnpj: cpf_cnpj,
        phone_number: phone_number,
        phone_number_2: phone_number_2,
        description: description,
        email: email,
        password: password,
        category_services: category_services,
        role: role,
      });

      return res.json(newServiceProvider);
    } catch (e) {
      return res.status(400).json({
        error: e.errors.map((error) => error.message),
      });
    }
  }

  async update(req, res) {
    try {
      if (!req.params.id) {
        return res.json.status(400).json({
          error: ['ID not sent'],
        });
      }

      const serviceProvider = await ServiceProvider.findByPk(req.params.id);

      if (!serviceProvider) {
        return res.status(400).json({
          error: ['ServiceProvider not found'],
        });
      }

      const updatedData = await serviceProvider.update(req.body);

      return res.json(updatedData);
    } catch (e) {
      return res.status(400).json({
        error: e.errors.map((error) => error.message),
      });
    }
  }

  async updatePassword(req, res) {
    try {
      const { id } = req.params;
      const { oldPassword, newPassword } = req.body;

      const serviceProvider = await ServiceProvider.findByPk(id);

      if (!serviceProvider) {
        return res.status(404).json({
          error: ['ServiceProvider not found'],
        });
      }

      const isMatch = await bcryptjs.compare(oldPassword, serviceProvider.password_hash);
      if (!isMatch) return res.status(403).json({ error: ['Password inválid'] });

      const hashedPassword = await bcryptjs.hash(newPassword, 8);
      await serviceProvider.update({ password_hash: hashedPassword });

      return res.status(200).json(['Password updated']);
    } catch (e) {
      return res.status(400).json({
        error: [e],
      });
    }
  }

  async delete(req, res) {
    try {
      if (!req.params.id) {
        return res.json.status(404).json({
          error: ['ID not sent'],
        });
      }

      const serviceProvider = await ServiceProvider.findByPk(req.params.id);

      if (!serviceProvider) {
        return res.status(404).json({
          error: ['ServiceProvider not found'],
        });
      }

      await serviceProvider.destroy();
      return res.json(serviceProvider);
    } catch (e) {
      return res.status(400).json({
        error: e.errors.map((error) => error.message),
      });
    }
  }
}

export default new ServiceProviderController();
