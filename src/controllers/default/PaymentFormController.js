import PaymentForm from '../../models/default/paymentForm';

class PaymentFormController {
  async index(req, res) {
    try {
      const paymentForms = await PaymentForm.findAll();
      return res.json(paymentForms);
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

      const newPaymentForm = await PaymentForm.create({ name: name });
      return res.json(newPaymentForm);
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: e.errors,
      });
    }
  }
}

export default new PaymentFormController();
