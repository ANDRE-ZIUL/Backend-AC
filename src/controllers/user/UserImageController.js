import multer from 'multer';
import multerConfig from '../../config/multer';
import UserImage from '../../models/user/UserImage';

const upload = multer(multerConfig).single('image');

class UserImageController {
  create(req, res) {
    return upload(req, res, async (error) => {
      if (error) {
        return res.status(400).json({
          error: [error.code],
        });
      }

      try {
        const { filename, path } = req.file;
        const { user_id } = req.body;

        const image = await UserImage.create({
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

  async show(req, res) {
    try {
      const { id } = req.params;

      const image = await UserImage.findOne({
        where: { user_id: id },
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

export default new UserImageController();
