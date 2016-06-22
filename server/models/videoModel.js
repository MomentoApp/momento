const db = require('./../db');

module.exports = {
  get: (latitude, longitude, radius, cb) => {
    // console.log(latitude, longitude, radius);
    db.sequelize.query(
      'select * from "Video" where ' +
      'ST_DWithin(ST_SetSRID' +
      '(ST_Point( ' + latitude +
      ', ' + longitude +
      '),4326)::geography, ST_SetSRID' +
      '(point,4326)::geography, '
      + radius + ' );'
    )
      .then(video => cb(null, video))
      .catch(cb);
  },
  post: (newVideo, cb) => {
    // console.log(newVideo);
    db.Video.create({
      url: newVideo.url,
      point: newVideo.point,
      UserId: newVideo.UserId,
    })
      .then((video) => cb(null, video))
      .catch(cb);
  },
};
