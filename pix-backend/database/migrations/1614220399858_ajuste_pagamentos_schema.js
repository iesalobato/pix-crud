'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AjustePagamentosSchema extends Schema {
  up () {
    this.table('pagamentos', (table) => {
      table.dropColumn('CPF')
      table.string('cpf',11).notNullable()
      table.dropColumn('chave')
      table.string('chave_pix',100).notNullable()
      table.dropColumn('porcentagem')
      table.float('porcentagem_individual')
    })
  }
}

module.exports = AjustePagamentosSchema
