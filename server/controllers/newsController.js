const { News } = require('../models');
const { User } = require('../models');

module.exports = {
  createNews(req, res) {
    return News.create({ name: req.body.name, stage: req.body.stage })
      .then((student) => res.status(200).send(student))
      .catch((e) => res.status(500).send(e));
  },

  getAllNews(req, res) {
    return News.findAll({
      order: [
        ['createdAt', 'DESC']],
      include: [{ model: User, as: 'user' }],
    })
      .then((news) => res.status(200).send(news))
      .catch((e) => res.status(400).send(e));
  },
};
