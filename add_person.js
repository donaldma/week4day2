const settings = require("./settings"); // settings.json
const args = process.argv.slice(2);
const knex = require('knex')({
  client: 'pg',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  }
});

knex.insert([{first_name: args[0], last_name: args[1], birthdate: args[2]}], 'id').into('famous_people')
.asCallback(function(err, rows) {
  if(err) {
    return console.error("error running query", err);
  } else {
    knex.destroy();
  }
});
