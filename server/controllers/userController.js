const uuid = require('uuid');
const path = require('path');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { News } = require('../models');

module.exports = {
  createUser(req, res) {
    return User.create({ name: req.body.name, stage: req.body.stage })
      .then((student) => res.status(201).send(student))
      .catch((e) => res.status(500).send(e));
  },

  getOneUser(req, res) {
    const { id } = req.params;
    return User.findOne({
      where: { id },
      include: [{ model: News, as: 'news' }],
    })
      .then((user) => res.status(200).send(user))
      .catch((e) => res.status(500).send(e));
  },

  getProfile(req, res) {
    const { authorization } = req.headers;
    const isVerify = jwt.verify(authorization, process.env.accessTokenSecret);
    return User.findOne({
      where: { id: isVerify.id },
      include: [{ model: News, as: 'news' }],
      order: [
        [
          { model: News, as: 'news' },
          'createdAt', 'DESC',
        ],
      ],
    })
      .then((user) => res.status(200).send(user))
      .catch((e) => res.status(500).send(e));
  },

  updateProfile(req, res) {
    const { authorization } = req.headers;
    const isVerify = jwt.verify(authorization, process.env.accessTokenSecret);
    if (isVerify) {
      const { name, login } = req.body;
      const { avatar } = req.files;
      const fileName = `${uuid.v4()}.jpg`;
      avatar.mv(path.resolve(__dirname, '..', 'uploads', fileName));
      return User.update({ name, login, avatar: fileName }, {
        where: { id: isVerify.id },
      })
        .then((user) => res.status(200).send(user))
        .catch((e) => res.status(500).send(e));
    }
    return res.status(403).send({ message: 'Not authorized' });
  },
};
