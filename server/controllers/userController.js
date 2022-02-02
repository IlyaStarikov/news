const { User } = require('../models');

module.exports = {
    createUser(req, res) {
      return News.create({ name: req.body.name, stage: req.body.stage })
        .then((student) => res.status(200).send(student))
        .catch((e) => res.status(500).send(e));
    },
}