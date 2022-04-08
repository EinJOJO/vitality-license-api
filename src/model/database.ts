import mysql from 'mysql2';
import Logger from './logger';

const params: mysql.ConnectionOptions = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT || '3306'),
};

const database = mysql.createConnection(params);

export default database;
