'use strict'
const User = use('App/Models/User')
const Mail = use('Mail')
const randomString = require('random-string')

class UserController {
  async index () {
    const user = await User.query()
      .with('company')
      .fetch()
    return user
  }

  async store ({ request, response }) {
    try {
      const user = await User.create({
        username: request.input('username'),
        email: request.input('email'),
        company_id: request.input('company_id'),
        password: request.input('password'),
        confirmation_token: randomString({ length: 40 })
      })

      const token = User.findBy('confirmation_token', user.confirmation_token)
      const newToken = Object.keys([token]).map(() => user.confirmation_token)
      const url = `http://localhost:3000/registro/confirmado/${newToken}`

      await Mail.send(
        'emails.confirmation_account',
        {
          username: user.username,
          link: url
        },
        message => {
          message
            .to(user.email)
            .from('bc3e@gmail.com')
            .subject('Confirmação de cadastro')
        }
      )
      return response.status(200).send({ message: `Ola ${user.username}, favor verificar o e-mail ${user.email}, para completarmos o cadastro.` })
    } catch (err) {
      return response.status(400).send({ error: { message: 'algo deu errado, tente novamente' } })
    }
  }

  async update ({ params, request }) {
    const user = await User.findOrFail(params.id)
    const data = request.only(['username', 'email', 'password', 'company_id'])

    user.merge(data)
    user.save()

    return user
  }

  // async show({ params }) {
  //   const user = await User.findOrFail(params.id)
  //   await user.load('contracts')
  //   await user.load('files')
  //   return user
  // }

  async show ({ auth, params, response }) {
    if (auth.user.id !== params.id) {
      return response.send({ error: { message: 'Você não pode ver o perfil de outra pessoa' } })
    }
  }

  async destroy ({ params, response }) {
    const user = await User.findOrFail(params.id)
    const userDelete = await user.delete()

    if (userDelete) {
      return response.status(201).send({ message: 'User Deleted' })
    }
  }
}

module.exports = UserController
