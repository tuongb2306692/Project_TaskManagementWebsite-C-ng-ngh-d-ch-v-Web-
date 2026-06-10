/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) { 
    return knex.schema.createTable('task_lists', (table) => { 
        table.increments('tl_id').primary();

        table.integer('user_id') 
        .unsigned() 
        .notNullable() 
        .references('user_id') 
        .inTable('users') 
        .onDelete('CASCADE'); 

        table.string('tl_name', 100) 
        .notNullable(); 

        table.text('tl_description'); 

        table.timestamp('tl_created_at') 
        .defaultTo(knex.fn.now()); 

        table.timestamp('tl_updated_at') 
        .defaultTo(knex.fn.now()); }); };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) { 
    return knex.schema.dropTableIfExists('task_lists'); 
};
