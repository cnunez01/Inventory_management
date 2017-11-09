let mysql = require('mysql');

let pool = mysql.createPool({
  host: 'localhost',
  user: process.env.db_user,
  password: process.env.db_password,
  database: 'inventory_management'
});

exports.pool = pool;
