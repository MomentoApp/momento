const db = require('./../db');

module.exports = {
  get: (someVideo, cb) => {
    db.Video.findAll({
      // where: { point: someVideo.point },
    })
      .then(video => cb(null, video))
      .catch(cb);
  },
  post: (newVideo, cb) => {
    console.log(newVideo);
    db.Video.create({
      url: newVideo.url,
      point: { type: 'Point', coordinates: [newVideo.latitude, newVideo.longitude] },
      UserId: newVideo.UserId,
    })
      .then((video) => cb(null, video))
      .catch(cb);
  },
};
