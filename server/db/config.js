module.exports = {
  username: 'postgres',
  password: null,
  database: 'momento',
  config: {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
  },
};
