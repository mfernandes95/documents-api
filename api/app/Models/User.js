'use strict'

const Model = use('Model')
const Hash = use('Hash')

class User extends Model {
  static boot () {
    super.boot()

    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  tokens () {
    return this.hasMany('App/Models/Token')
  }

  company () {
    return this.belongsTo('App/Models/Company')
  }

  contracts () {
    return this.hasMany('App/Models/Contract')
  }

  files () {
    return this.hasMany('App/Models/File')
  }

  user () {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = User
