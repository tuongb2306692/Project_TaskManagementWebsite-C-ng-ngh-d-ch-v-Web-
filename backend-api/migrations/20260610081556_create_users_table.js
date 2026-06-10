/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) { 
    return knex.schema.createTable('users', (table) => { 
        table.increments('user_id').primary(); 

        table.string('user_username', 50) 
        .notNullable() 
        .unique(); 

        table.string('user_password_hash', 255) 
        .notNullable(); 

        table.timestamp('user_created_at') 
        .defaultTo(knex.fn.now()); 

        table.timestamp('user_updated_at') 
        .defaultTo(knex.fn.now()); }); };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) { 
    return knex.schema.dropTableIfExists('users'); 
};
