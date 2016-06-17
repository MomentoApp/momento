const db = require('./index');

db.User.create({
  name: 'mango',
});

db.User.create({
  name: 'nick',
});

db.User.create({
  name: 'chris',
});

const point = { type: 'Point', coordinates: [39.807222, -76.984722] };

db.Video.create({
  url: 'https://instagram.fsjc1-2.fna.fbcdn.net/t50.2886-16/13477956_200851573643145_931110641_n.mp4',
  point,
  UserId: 1,
});

