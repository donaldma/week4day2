
exports.up = function(knex) {
  return knex.schema.createTable("milestones", (table) => {
    table.increments('id').primary;
    table.string("description");
    table.date("date_achieved");
  });
};
exports.down = function(knex) {
  return knex.schema.dropTable("milestones");
}
