const { Pool } = require("pg");
require("dotenv").config();

// Se utiliza la URL directa de conexión URI que provee Supabase
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Obligatorio para permitir la conexión segura SSL con Supabase
  }
});

module.exports = pool;