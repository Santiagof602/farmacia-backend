import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const Db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'tu_password',
  database: 'farmacia_db',
  port: 3306
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos ');
});

export default db;