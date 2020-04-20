'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CompanySchema extends Schema {
  up() {
    this.create('companies', (table) => {
      table.increments()
      table.string('corporate_name', 80).notNullable().unique()
      table.string('fantasy_name', 80).notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('cnpj', 254).notNullable().unique()
      table.string('address', 254).notNullable()
      table.string('zipcode', 254).notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('companies')
  }
}

module.exports = CompanySchema
