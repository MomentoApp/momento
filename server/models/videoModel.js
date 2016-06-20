const db = require('./../db');

module.exports = {
  get: (someVideo, cb) => {
    console.log(someVideo);
    db.sequelize.query(
      'select * from "Video" where ' +
      'ST_DWithin(ST_SetSRID' +
      '(ST_Point( ' + 37.7837221 +
      ', ' + -122.4091839 +
      '),4326)::geography, ST_SetSRID' +
      '(point,4326)::geography, '
      + 1000 + ' );'
    )
      .then(video => cb(null, video))
      .catch(cb);
  },
  post: (newVideo, cb) => {
    console.log(newVideo);
    db.Video.create({
      url: newVideo.url,
      point: newVideo.point,
      UserId: newVideo.UserId,
    })
      .then((video) => cb(null, video))
      .catch(cb);
  },
};
