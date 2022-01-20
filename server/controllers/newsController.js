const { News } = require('../models');

module.exports = {
  createStudent(req, res) {
    return News.create({ name: req.body.name, stage: req.body.stage })
      .then((student) => res.status(200).send(student))
      .catch((e) => res.status(500).send(e));
  },

  updateStudent(req, res) {
    return News.update({ stage: req.body.stage }, { where: { id: req.params.id } })
      .then(() => res.status(200).send())
      .catch((e) => res.status(500).send(e));
  },

  deleteStudent(req, res) {
    return News.destroy({ where: { id: req.params.id } })
      .then(() => res.status(200).send())
      .catch((e) => res.status(500).send(e));
  },

  getAllNews(req, res) {
    return News.findAll({
      order: [
        ['createdAt', 'DESC']],
    })
      .then((news) => res.status(200).send(news))
      .catch((e) => res.status(400).send(e));
  },
};
