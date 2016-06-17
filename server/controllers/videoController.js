const User = require('../models/videoModel');

module.exports = {
  get: (req, res) => {
    console.log('video get req body', req.body);
    User.get(req.body, (err, data) => {
      if (err) throw err;
      res.send(data);
    });
  },
  post: (req, res) => {
    console.log('video post req body', req.body);
    User.post(req.body, (err, data) => {
      if (err) throw err;
      res.status(201);
      res.send(data);
    });
  },
};
