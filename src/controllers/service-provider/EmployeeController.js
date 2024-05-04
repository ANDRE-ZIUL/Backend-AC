import Employee from '../../models/service-provider/Employee';

class EmployeeController {
  async index(req, res) {
    try {
      const employess = await Employee.findAll();
      return res.json(employess);
    } catch (e) {
      return res.status(404).json({
        error: e.errors ? e.errors.map((error) => error.message) : e.message,
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
      const employee = await Employee.findAll({ where: { provider_service_id: req.params.id, deleted_at: null } });

      if (!employee) {
        return res.status(404).json({
          errors: ['Employee not found'],
        });
      }

      return res.json(employee);
    } catch (e) {
      return res.status(404).json({
        error: e.errors ? e.errors.map((error) => error.message) : e.message,
      });
    }
  }

  async create(req, res) {
    try {
      const {
        provider_service_id, name, cpf, register,
      } = req.body;

      const newEmployee = await Employee.create({
        provider_service_id: provider_service_id,
        name: name,
        cpf: cpf,
        register: register,
      });

      return res.json(newEmployee);
    } catch (e) {
      return res.status(400).json({
        error: e.errors ? e.errors.map((error) => error.message) : e.message,
      });
    }
  }

  async update(req, res) {
    try {
      if (!req.params.id) {
        return res.json.status(400).json({
          errors: ['ID not sent'],
        });
      }

      const employee = await Employee.findByPk(req.params.id);

      if (!employee) {
        return res.status(404).json({
          errors: ['Employee not found'],
        });
      }

      const updatedData = await employee.update(req.body);
      return res.json(updatedData);
    } catch (e) {
      return res.status(400).json({
        error: e.errors ? e.errors.map((error) => error.message) : e.message,
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

      const employee = await Employee.findByPk(req.params.id);

      if (!employee) {
        return res.status(404).json({
          errors: ['Employee not found'],
        });
      }

      await employee.update({ deleted_at: new Date() });
      return res.json({
        errors: ['Employee deleted'],
      });
    } catch (e) {
      return res.status(400).json({
        error: e.errors ? e.errors.map((error) => error.message) : e.message,
      });
    }
  }

  async getOneEmployee(req, res) {
    try {
      if (!req.params.id) {
        return res.json.status(400).json({
          errors: ['ID not sent'],
        });
      }

      const employee = await Employee.findByPk(req.params.id);

      if (!employee) {
        return res.status(404).json({
          errors: ['Employee not found'],
        });
      }

      return res.json(employee);
    } catch (e) {
      return res.status(400).json({
        error: e.errors ? e.errors.map((error) => error.message) : e.message,
      });
    }
  }
}

export default new EmployeeController();
