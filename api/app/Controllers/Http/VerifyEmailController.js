'use strict'
const User = use('App/Models/User')
const Mail = use('Mail')
const randomString = require('random-string')

class VerifyEmailController {
  async show({ params, response }) {
    const user = await User.findBy('confirmation_token', params.token)
    const dateExpired = await user.updated_at
    const newDate = await dateExpired.setHours(dateExpired.getHours() + 23)

    if (newDate < new Date()) {
      user.confirmation_token = null
      user.account_status = 0

      await user.save()
      return response
        .status(404)
        .send({
          error: { message: 'seu token foi expirado, favor gerar um novo' },
        })
    } else {
      user.account_status = 1

      await user.save()
      return response
        .status(200)
        .send({ message: `parabéns ${user.username}, e-mail confirmado` })
    }
  }

  async store({ request, response }) {
    try {
      const userEmail = await request.only(['email'])
      const user = await User.findBy('email', userEmail.email)
      const token = await randomString({ length: 40 })

      if (!user) {
        return response
          .staus(401)
          .send({
            error: {
              message: `O email (${user}) não foi cadastrado ainda, favor cadastrá-lo`,
            },
          })
      }

      user.confirmation_token = token
      user.account_status = 0

      await user.save()

      const url = `http://localhost:3000/recuperacao/senha/${token}`
      await Mail.send(
        'emails.recuperation_password',
        {
          username: user.username,
          link: url,
        },
        (message) => {
          message
            .to(user.email)
            .from('documentsapi@gmail.com')
            .subject('Recuperação de senha')
        }
      )
      return response
        .status(200)
        .send({
          message: `Uma nova confirmação de conta foi enviada ao email (${user.email}), favor verificar`,
        })
    } catch (err) {
      return response
        .status(401)
        .send({ error: { message: 'algo deu errado, tente novamente' } })
    }
  }
}
module.exports = VerifyEmailController
