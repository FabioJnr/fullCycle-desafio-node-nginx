const express = require("express");
const faker = require("faker");
const mysql = require("mysql");

const app = express();
const PORT = 3000;

const config = {
  host: "db",
  user: "root",
  password: "password",
  database: "nodedb",
};

app.get("/", (req, res) => {
  insertPeopleName(res);
});

app.listen(PORT, () => {
  console.log("STARTED AT " + PORT);
});

async function insertPeopleName(res) {
  const name = faker.name.findName();
  const connection = mysql.createConnection(config);
  const sql = `INSERT INTO people(name) values('${name}')`;

  connection.query(sql);
  console.log(`${name} inserido no banco!`);
  getPeople(res, connection);
}

function getPeople(res, connection) {
  const sql = `SELECT id, name FROM people`;

  connection.query(sql, (error, results, fields) => {
    if (error) {
      throw error;
    }

    res.send(`
    <h1>Full Cycle Rocks!</h1>
    <ol>
      ${
        !!results.length
          ? results.map((el) => `<li>${el.name}</li>`).join("")
          : ""
      }
    </ol>
  `);
  });
  connection.end();
}
