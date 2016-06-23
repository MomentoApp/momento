module.exports = {
  username: 'momento',
  password: 'Hackreactor',
  database: 'momento',
  config: {
    host: 'momento.caxamxz9bjrd.us-west-2.rds.amazonaws.com',
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
  },
};
