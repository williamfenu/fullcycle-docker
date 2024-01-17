const express = require("express");
const mysql = require("mysql2");
const random_name = require("node-random-name");

const app = express();

var con = mysql.createConnection({
  host: "mysql-container",
  database: "fullcycle",
  user: "root",
  password: "root",
});

const port = 3000;
const insertQuery = (name) => `INSERT INTO people(NAME) VALUES('${name}')`;
const selectQuery = "SELECT * FROM people";

const getBody = (people) => {
  const lis = people.map((person) => `<li>${person.name}</li>`);

  return `<h1>Full cycle rocks!!!</h1>
          <ul>
          ${lis.join(" ")}
          </ul>  
          `;
};

app.get("/", async (req, res) => {
  con.query(insertQuery(random_name()), function (insertError) {
    if (insertError) {
      console.log("Error on insertion: " + insertError);
      throw new Error();
    }

    con.query(selectQuery, function (selectError, results) {
      if (selectError) {
        console.log("Error on selection: " + selectError);
        throw new Error();
      }

      res.send(getBody(results));
    });
  });
});

app.listen(port, () => {
  console.log("listening....");
});
