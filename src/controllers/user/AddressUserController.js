import AddressUser from '../../models/user/AddressUser';

class AddressUserController {
  async index(req, res) {
    try {
      const address = await AddressUser.findAll();
      return res.json(address);
    } catch (e) {
      return res.json({
        error: e.errors.map((error) => error.message),
      });
    }
  }

  async show(req, res) {
    try {
      if (!req.params.id) {
        return res.json.status(400).json({
          errors: ['ID not sent'],
        });
      }
      const address = await AddressUser.findAll({ where: { user_id: req.params.id, deleted_at: null } });
      return res.json(address);
    } catch (e) {
      return res.json({
        error: e.errors.map((error) => error.message),
      });
    }
  }

  async create(req, res) {
    try {
      const {
        user_id, name, zip_code, street, number, district, complement, city, uf,
      } = req.body;

      const newAddress = await AddressUser.create({
        user_id,
        name,
        zip_code,
        street,
        number,
        district,
        complement,
        city,
        uf,
      });

      return res.json(newAddress);
    } catch (e) {
      return res.json({
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

      const address = await AddressUser.findByPk(req.params.id);

      if (!address) {
        return res.status(404).json({
          errors: ['Address not found'],
        });
      }

      const updatedData = await address.update(req.body);
      return res.json(updatedData);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((error) => error.message),
      });
    }
  }

  async delete(req, res) {
    try {
      if (!req.params.id) {
        return res.json.status(400).json({
          errors: ['ID not sent'],
        });
      }

      const address = await AddressUser.findByPk(req.params.id);

      if (!address) {
        return res.status(404).json({
          errors: ['Address not found'],
        });
      }

      await address.update({ deleted_at: new Date() });
      return res.json(address);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((error) => error.message),
      });
    }
  }

  async oneGetAddress(req, res) {
    try {
      if (!req.params.id) {
        return res.json.status(400).json({
          errors: ['ID not sent'],
        });
      }

      const address = await AddressUser.findByPk(req.params.id);

      if (!address) {
        return res.status(404).json({
          errors: ['Address not found'],
        });
      }

      return res.json(address);
    } catch (e) {
      return res.status(400).json({
        errors: [e],
      });
    }
  }
}

export default new AddressUserController();
