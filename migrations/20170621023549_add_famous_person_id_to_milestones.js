
exports.up = function(knex) {
  return knex.schema.table("milestones", (table) => {
    table.integer("famous_person_id").references("famous_people.id");
  });
};

exports.down = function(knex) {
  return knex.schema.table("milestones", (table) => {
    table.dropColumns("famous_person_id");
  });
};