const { User } = require('../models');
const { News } = require('../models');

module.exports = {
    createUser(req, res) {
      return User.create({ name: req.body.name, stage: req.body.stage })
        .then((student) => res.status(200).send(student))
        .catch((e) => res.status(500).send(e));
    },

    getOneUser(req, res) {
      const { id } = req.params;
      return User.findOne({
        where: {id},
        include: [{model: News, as: 'news'}]
      })
        .then((user) => res.status(200).send(user))
        .catch((e) => res.status(500).send(e));
    }
}