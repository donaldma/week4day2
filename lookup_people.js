const pg = require("pg");
const name = process.argv[2];
const settings = require("./settings"); // settings.json
const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query(`SELECT * FROM famous_people WHERE first_name = '${name}' OR last_name = '${name}'`, (err, results) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log(`Searching ...\nFound 1 person(s) by the name '${name}'`);
    for(var i = 0; i < results.rows.length; i++) {
      var birthdate = `${results.rows[i].birthdate.getFullYear()}-${results.rows[i].birthdate.getMonth()}-${results.rows[i].birthdate.getDate()}`
      console.log(`- ${results.rows[i].id}: ${results.rows[i].first_name} ${results.rows[i].last_name}, born ${birthdate}`)
    }
    client.end();
  });
});