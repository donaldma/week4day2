const settings = require("./settings"); // settings.json
const name = process.argv[2];
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

knex('famous_people')
.where('first_name', name)
.orWhere('last_name', name)
.asCallback(function(err, rows) {
  if(err) {
    return console.error("error running query", err);
  }
  console.log(`Searching ...\nFound 1 person(s) by the name '${name}'`);
  for(var i = 0; i < rows.length; i++) {
    var birthdate = `${rows[i].birthdate.getFullYear()}-${rows[i].birthdate.getMonth()}-${rows[i].birthdate.getDate()}`
    console.log(`- ${rows[i].id}: ${rows[i].first_name} ${rows[i].last_name}, born ${birthdate}`)
  }
});