import multer from 'multer';
import multerConfig from '../../config/multer';
import ServiceProviderImage from '../../models/service-provider/ServiceProviderImage';

const upload = multer(multerConfig).single('image');

class ServiceProviderImageController {
  create(req, res) {
    return upload(req, res, async (error) => {
      if (error) {
        return res.status(400).json({
          error: [error.code],
        });
      }

      try {
        const { filename, path } = req.file;
        const { service_provider_id } = req.body;

        const image = await ServiceProviderImage.create({
          service_provider_id: service_provider_id,
          filename: filename,
          path: path,
        });

        return res.json(image);
      } catch (e) {
        return res.status(400).json({
          error: e.errors ? e.errors.map((err) => err.message) : e.message,
        });
      }
    });
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      const image = await ServiceProviderImage.findOne({
        where: { service_provider_id: id },
        order: [['created_at', 'DESC']],
      });

      return res.json(image);
    } catch (e) {
      return res.status(400).json({
        error: e.errors ? e.errors.map((err) => err.message) : e.message,
      });
    }
  }
}

export default new ServiceProviderImageController();
