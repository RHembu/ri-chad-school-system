require("dotenv").config();

const pool = require("./config/db");

async function test() {
  try {
    const result = await pool.query(
      "SELECT NOW()"
    );

    console.log(
      "Database Connected"
    );

    console.log(result.rows[0]);

    process.exit(0);
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
}

test();