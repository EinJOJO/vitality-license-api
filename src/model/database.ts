import mysql from 'mysql2';
import * as dotenv from 'dotenv';
import Logger from './logger';
dotenv.config();

const params: mysql.ConnectionOptions = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT || '3306'),
};

Logger.log(JSON.stringify(params), 'Connecting to database');

const database = mysql.createConnection(params);

export default database;
