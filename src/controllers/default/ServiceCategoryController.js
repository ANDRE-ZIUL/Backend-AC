import ServiceCategorie from '../../models/default/serviceCategory';

class ServiceCategoryController {
  async index(req, res) {
    try {
      const serviceCategories = await ServiceCategorie.findAll();
      return res.json(serviceCategories);
    } catch (e) {
      return res.json({
        error: e.errors ? e.errors.map((error) => error.message) : e,
      });
    }
  }

  async create(req, res) {
    console.log(req.body);
    try {
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({
          error: ['Name is required'],
        });
      }

      const newServiceCategory = await ServiceCategorie.create({ name: name });
      return res.json(newServiceCategory);
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: e.errors,
      });
    }
  }
}

export default new ServiceCategoryController();
