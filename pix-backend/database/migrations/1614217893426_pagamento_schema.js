'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PagamentoSchema extends Schema {
  up () {
    this.create('pagamentos', (table) => {
      table.string('nome_destinatario', 100).notNullable()
      table.string('CPF', 11).notNullable()
      table.string('instituicao', 100).notNullable()
      table.string('chave', 100).notNullable()
      table.float('valor').notNullable()
      table.date('data_pagamento').notNullable()
      table.string('descricao', 100).notNullable()
      table.float('porcentagem', 100).notNullable()
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('pagamentos')
  }
}

module.exports = PagamentoSchema
