/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) { 
    return knex.schema.createTable('tasks', (table) => { 
        table.increments('task_id').primary(); 
        
        table.integer('tl_id') 
        .unsigned() 
        .notNullable() 
        .references('tl_id') 
        .inTable('task_lists') 
        .onDelete('CASCADE'); 
        
        table.string('task_title', 150) 
        .notNullable(); 
        
        table.text('task_description'); 
        
        table.string('task_priority', 20) 
        .notNullable() 
        .defaultTo('Medium'); 
        
        table.string('task_status', 20) 
        .notNullable() 
        .defaultTo('Todo'); 

        table.date('task_due_date'); 

        table.timestamp('task_created_at') 
        .defaultTo(knex.fn.now()); 

        table.timestamp('task_updated_at') 
        .defaultTo(knex.fn.now()); 
    }); 
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) { 
    return knex.schema.dropTableIfExists('tasks'); 
};
