import multer from 'multer';
import multerConfig from '../../config/multer';
import AutoImage from '../../models/user/AutoImage';

const upload = multer(multerConfig).single('image');

class AutoImageController {
  create(req, res) {
    return upload(req, res, async (error) => {
      if (error) {
        return res.status(400).json({
          error: [error.code],
        });
      }

      try {
        const { filename, path } = req.file;
        const { auto_id, user_id } = req.body;

        const image = await AutoImage.create({
          auto_id: auto_id,
          user_id: user_id,
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

  async getImagesForId(req, res) {
    try {
      const { userId } = req.params;

      if (!userId) return res.status(401).json({ error: 'User ID not send' });

      const images = await AutoImage.findAll({ where: { user_id: userId } });

      return res.json(images);
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  }
}

export default new AutoImageController();
