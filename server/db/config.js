module.exports = {
  username: process.env.db_username,
  password: process.env.db_password,
  database: process.env.db_database,
  config: {
    host: process.env.db_host,
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
  },
};
