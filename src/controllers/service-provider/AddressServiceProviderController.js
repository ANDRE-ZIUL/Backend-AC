import AddressServiceProvider from '../../models/service-provider/AddressServiceProvider';

class AddressServiceProviderController {
  async index(req, res) {
    try {
      const address = await AddressServiceProvider.findAll();
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
          error: ['ID not sent'],
        });
      }
      const address = await AddressServiceProvider.findOne({ where: { service_provider_id: req.params.id } });
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
        service_provider_id, name, zip_code, street, number, district, complement, city, uf,
      } = req.body;

      const newAddress = await AddressServiceProvider.create({
        service_provider_id: service_provider_id,
        name: name,
        zip_code: zip_code,
        street: street,
        number: number,
        district: district,
        complement: complement || '',
        city: city,
        uf: uf,
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

      const address = await AddressServiceProvider.findOne({ where: { service_provider_id: req.params.id } });

      if (!address) {
        return res.status(400).json({
          error: ['Address not found'],
        });
      }

      const updatedData = await address.update(req.body);
      return res.json(updatedData);
    } catch (e) {
      return res.status(400).json({
        error: e.errors.map((error) => error.message),
      });
    }
  }

  async delete(req, res) {
    try {
      if (!req.params.id) {
        return res.json.status(400).json({
          error: ['ID not sent'],
        });
      }

      const address = await AddressServiceProvider.findByPk(req.params.id);

      if (!address) {
        return res.status(404).json({
          error: ['Address not found'],
        });
      }

      await address.destroy();
      return res.json(address);
    } catch (e) {
      return res.status(400).json({
        error: e.errors.map((error) => error.message),
      });
    }
  }
}

export default new AddressServiceProviderController();
