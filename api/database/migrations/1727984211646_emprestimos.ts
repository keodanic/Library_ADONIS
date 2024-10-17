import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'emprestimos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_emprestimo').primary()
      table.timestamp('data_emprestimo').notNullable()
      table.string('data_devolucao').nullable()
      table.boolean('status').notNullable().defaultTo(false)
      table.bigInteger('livro_id').unsigned().references('id').inTable('livros').onDelete('SET NULL').onUpdate('CASCADE')
      table.bigInteger('user_id').unsigned().references('id').inTable('users').onDelete('SET NULL').onUpdate('CASCADE')

      
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}