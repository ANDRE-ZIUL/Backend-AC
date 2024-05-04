import { Sequelize, Op } from 'sequelize';
import Solicitation from '../../models/default/solicitation';
import SolicitationImage from '../../models/default/SolicitationImage';
// import Auto from '../../models/user/Auto';

class SolicitationController {
  async show(req, res) {
    try {
      if (!req.params.id) {
        return res.json.status(400).json({
          errors: ['ID not sent'],
        });
      }

      const solicitations = await Solicitation.findAll({
        where: { user_id: req.params.id },
        include: [{
          model: SolicitationImage,
          attributes: ['url', 'filename'],
        }],
      });

      return res.json(solicitations);
    } catch (e) {
      return res.status(404).json({
        error: e.errors ? e.errors.map((error) => error.message) : e.message,
      });
    }
  }

  async getOpenSolicitations(req, res) {
    try {
      const solicitations = await Solicitation.findAll({
        where: { status: { [Op.or]: ['Aguardando Atendimento', 'Aguardando aceite'] } },
        include: [{
          model: SolicitationImage,
          attributes: ['url', 'filename'],
        }],
      });
      return res.json(solicitations);
    } catch (e) {
      return res.status(400).json({
        error: e.errors ? e.errors.map((error) => error.message) : e.message,
      });
    }
  }

  async index(req, res) {
    try {
      const solicitations = await Solicitation.findAll();// { where: { status: 'Aguardando Atendimento' } });
      return res.json(solicitations);
    } catch (e) {
      return res.status(400).json({
        error: e.errors ? e.errors.map((error) => error.message) : e.message,
      });
    }
  }

  async getAllSolicitations(req, res) {
    const { status } = req.params;

    console.log(status);
    try {
      const solicitations = await Solicitation.findAll({ where: { status: status } });
      return res.json(solicitations);
    } catch (e) {
      return res.status(400).json({
        error: e.errors ? e.errors.map((error) => error.message) : e.message,
      });
    }
  }

  async oneSolicitation(req, res) {
    try {
      if (!req.params.id) return res.status(404).json({ errors: ['ID not send'] });

      const solicitation = await Solicitation.findAll({
        where: { id: req.params.id },
        include: [{
          model: SolicitationImage,
          attributes: ['url', 'filename'],
        }],
      });

      if (!solicitation) return res.status(404).json({ errors: [' Solicitation not found'] });

      return res.json(solicitation);
    } catch (e) {
      return res.status(400).json({
        error: e.errors ? e.errors.map((error) => error.message) : e.message,
      });
    }
  }

  async getMyServices(req, res) {
    try {
      if (!req.params.id) return res.status(404).json({ errors: ['ID not send'] });

      const solicitations = await Solicitation.findAll({
        where: { service_provider_id: req.params.id, status: { [Op.not]: 'Aguardando aceite' } },
        include: [{
          model: SolicitationImage,
          attributes: ['url', 'filename'],
        }],
      });

      if (!solicitations) return res.status(404).json({ errors: [' Solicitations not found'] });

      return res.json(solicitations);
    } catch (e) {
      return res.status(400).json({
        error: e.errors ? e.errors.map((error) => error.message) : e.message,
      });
    }
  }

  async getServicesProgress(req, res) {
    try {
      if (!req.params.id) return res.status(404).json({ errors: ['ID not send'] });

      const solicitations = await Solicitation.findAll({ where: { service_provider_id: req.params.id, status: 'Em atendimento' } });

      if (!solicitations) return res.status(404).json({ errors: [' Solicitations not found'] });

      return res.json(solicitations);
    } catch (e) {
      return res.status(400).json({
        error: e.errors ? e.errors.map((error) => error.message) : e.message,
      });
    }
  }

  async getServicesFinally(req, res) {
    try {
      if (!req.params.id) return res.status(404).json({ errors: ['ID not send'] });

      const solicitations = await Solicitation.findAll({ where: { service_provider_id: req.params.id, status: 'Finalizado', cancelated_at: null } });

      if (!solicitations) return res.status(404).json({ errors: [' Solicitations not found'] });

      return res.json(solicitations);
    } catch (e) {
      return res.status(400).json({
        error: e.errors ? e.errors.map((error) => error.message) : e.message,
      });
    }
  }

  async getServicesMonth(req, res) {
    try {
      if (!req.params.id) return res.status(404).json({ errors: ['ID not send'] });

      const solicitations = await Solicitation.findAll({
        where: {
          service_provider_id: req.params.id, status: 'Finalizado' || 'Em atendimento', cancelated_at: null, service_date: Sequelize.literal('MONTH(service_date) = MONTH(CURRENT_DATE())'),
        },
      });

      if (!solicitations) return res.status(404).json({ errors: [' Solicitations not found'] });

      return res.json(solicitations);
    } catch (e) {
      return res.status(400).json({
        error: e.errors ? e.errors.map((error) => error.message) : e.message,
      });
    }
  }

  async getServicesCancel(req, res) {
    try {
      if (!req.params.id) return res.status(404).json({ errors: ['ID not send'] });

      const solicitations = await Solicitation.findAll({ where: { service_provider_id: req.params.id, cancelated_at: { [Op.not]: null } } });

      if (!solicitations) return res.status(404).json({ errors: [' Solicitations not found'] });

      return res.json(solicitations);
    } catch (e) {
      return res.status(400).json({
        error: e.errors ? e.errors.map((error) => error.message) : e.message,
      });
    }
  }

  async create(req, res) {
    try {
      const {
        user_id, title, auto_id, service_category_id, description, bring_the_car, address_id, status, service_provider_id,
      } = req.body;

      let newSolicitation;

      if (service_provider_id) {
        newSolicitation = await Solicitation.create({
          user_id: user_id,
          title: title,
          auto_id: auto_id,
          service_category_id: service_category_id,
          description: description,
          bring_the_car: bring_the_car,
          address_id: address_id,
          status: status,
          service_provider_id: service_provider_id,
        });
      } else {
        newSolicitation = await Solicitation.create({
          user_id: user_id,
          title: title,
          auto_id: auto_id,
          service_category_id: service_category_id,
          description: description,
          bring_the_car: bring_the_car,
          address_id: address_id,
          status: status,
        });
      }
      return res.json(newSolicitation);
    } catch (e) {
      return res.json({
        error: e.errors ? e.errors.map((error) => error.message) : e.message,
      });
    }
  }

  async update(req, res) {
    try {
      console.log(req.body);
      if (!req.params.id) {
        return res.json.status(400).json({
          errors: ['ID not sent'],
        });
      }

      const solicitation = await Solicitation.findByPk(req.params.id);

      if (!solicitation) {
        return res.status(404).json({
          errors: ['Solicitation not found'],
        });
      }

      const updatedData = solicitation.update(req.body);

      return res.json(updatedData);
    } catch (e) {
      return res.status(400).json({
        error: e.errors ? e.errors.map((error) => error.message) : e.message,
      });
    }
  }

  async mySolicitationsWithAssessment(req, res) {
    try {
      if (!req.params.id) {
        return res.json.status(400).json({
          errors: ['ID not sent'],
        });
      }

      const solicitations = await Solicitation.findAll({ where: { service_provider_id: req.params.id, assessment: { [Op.not]: null } } });

      if (!solicitations) {
        return res.status(404).json({
          errors: ['Solicitations not found'],
        });
      }

      return res.json(solicitations);
    } catch (e) {
      return res.status(400).json({
        error: [e],
      });
    }
  }
}

export default new SolicitationController();
