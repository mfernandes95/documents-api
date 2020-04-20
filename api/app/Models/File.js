'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class File extends Model {
  contract () {
    return this.belongsTo('App/Models/Contract')
  }

  user () {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = File
