const { User, Product } = require("../models");

class UserController {
  async index(req, res) {
    try {
      const users = await User.findAll({ include: Product });
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async store(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new UserController();
