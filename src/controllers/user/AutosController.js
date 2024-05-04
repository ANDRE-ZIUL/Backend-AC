import Auto from '../../models/user/Auto';
import AutoImage from '../../models/user/AutoImage';

class AutosController {
  async index(req, res) {
    try {
      const autos = await Auto.findAll({
        attributes: ['id', 'user_id', 'plate', 'brand', 'type', 'model', 'year'],
        order: [['id', 'DESC']],
      });
      return res.json(autos);
    } catch (e) {
      return res.json({
        error: e.errors ? e.errors.map((error) => error.message) : e.message,
      });
    }
  }

  async show(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          error: ['ID not sent'],
        });
      }

      const auto = await Auto.findAll({
        where: { user_id: req.params.id },
        attributes: ['id', 'user_id', 'plate', 'brand', 'type', 'model', 'year'],
        order: [['id', 'DESC']],
        include: [{
          model: AutoImage,
          attributes: ['url', 'filename'],
        }],
      });

      return res.json(auto);
    } catch (e) {
      return res.status(500).json({
        error: e.errors ? e.errors.map((error) => error.message) : e.message,
      });
    }
  }

  async allAutos(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          error: ['ID not sent'],
        });
      }

      const auto = await Auto.findAll({
        where: { user_id: req.params.id },
        attributes: ['id', 'user_id', 'plate', 'brand', 'type', 'model', 'year'],
        order: [['id', 'DESC']],
        include: [{
          model: AutoImage,
          attributes: ['url', 'filename'],
        }],
      });

      return res.json(auto);
    } catch (e) {
      return res.status(500).json({
        error: e.errors ? e.errors.map((error) => error.message) : e.message,
      });
    }
  }

  async getMyActiveAutos(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          error: ['ID not sent'],
        });
      }

      const auto = await Auto.findAll({
        where: { user_id: req.params.id, deleted_at: null },
        attributes: ['id', 'user_id', 'plate', 'brand', 'type', 'model', 'year'],
        order: [['id', 'DESC']],
        include: [{
          model: AutoImage,
          attributes: ['url', 'filename'],
        }],
      });

      return res.json(auto);
    } catch (e) {
      return res.status(500).json({
        error: e.errors ? e.errors.map((error) => error.message) : e.message,
      });
    }
  }

  async create(req, res) {
    try {
      const {
        user_id, plate, brand, type, model, year,
      } = req.body;

      const newAuto = await Auto.create({
        user_id: user_id,
        plate: plate,
        brand: brand,
        type: type,
        model: model,
        year: year,
      });

      return res.json(newAuto);
    } catch (e) {
      return res.json({
        error: e.errors ? e.errors.map((error) => error.message) : e.message,
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

      const auto = await Auto.findByPk(req.params.id);

      if (!auto) {
        return res.status(404).json({
          error: ['Auto not found'],
        });
      }

      const updatedData = await auto.update(req.body);

      return res.json(updatedData);
    } catch (e) {
      return res.json({
        error: e.errors ? e.errors.map((error) => error.message) : e.message,
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

      const auto = await Auto.findByPk(req.params.id);

      if (!auto) {
        return res.status(404).json({
          error: ['Auto not found'],
        });
      }

      await auto.update({ deleted_at: new Date() });

      return res.json({
        message: 'Auto deleted',
      });
    } catch (e) {
      return res.status(400).json({
        error: e.errors ? e.errors.map((error) => error.message) : e.message,
      });
    }
  }

  async getOneAuto(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          error: ['ID not sent'],
        });
      }

      const auto = await Auto.findOne({
        where: { id: req.params.id },
        include: [{
          model: AutoImage,
          attributes: ['url', 'filename'],
        }],
      });

      if (!auto) {
        return res.status(404).json({
          error: ['Auto not found'],
        });
      }

      return res.json(auto);
    } catch (e) {
      return res.status(500).json({
        error: [e],
      });
    }
  }
}

export default new AutosController();
