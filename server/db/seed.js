const db = require('./index');

db.sequelize.sync({ force: true })
  .then(() => {
    db.User.create({
      name: 'mango',
    });

    db.User.create({
      name: 'nick',
    });

    db.User.create({
      name: 'chris',
    });

    // hack reactor
    db.Video.create({
      url: 'https://instagram.fsjc1-2.fna.fbcdn.net/t50.2886-16/13477956_200851573643145_931110641_n.mp4',
      point: { type: 'Point', coordinates: [37.7837221, -122.4091839] },
      UserId: 1,
    });

    // west san francisco centre
    db.Video.create({
      url: 'https://instagram.fsjc1-2.fna.fbcdn.net/t50.2886-16/13477956_200851573643145_931110641_n.mp4',
      point: { type: 'Point', coordinates: [37.7847912, -122.40713522] },
      UserId: 1,
    });

    // powell station exit
    db.Video.create({
      url: 'https://instagram.fsjc1-2.fna.fbcdn.net/t50.2886-16/13477956_200851573643145_931110641_n.mp4',
      point: { type: 'Point', coordinates: [37.784415, -122.408103] },
      UserId: 1,
    });

    // old jerusalem
    db.Video.create({
      url: 'https://instagram.fsjc1-2.fna.fbcdn.net/t50.2886-16/13477956_200851573643145_931110641_n.mp4',
      point: { type: 'Point', coordinates: [37.7493593, -122.4183427] },
      UserId: 1,
    });
  });

