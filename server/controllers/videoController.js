const Video = require('../models/videoModel');

module.exports = {
  get: (req, res) => {
    console.log('video get req body', req.body);
    Video.get(req.body, (err, data) => {
      if (err) throw err;
      res.send(data);
    });
  },
  post: (req, res) => {
    console.log('video post req body', req.body);
    Video.post(req.body, (err, data) => {
      if (err) throw err;
      res.status(201);
      res.send(data);
    });
  },
};
