'use strict'
const User = use('App/Models/User')
const Yup = use('yup')

class PasswordResetController {
  async update({ request, response, params }) {
    const schema = Yup.object().shape({
      password: Yup.string().min(8).required(),
      passwordConfirm: Yup.string().min(8).required()
    })

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({
        error: 'Erro na validação, verifique seus dados'
      })
    }

    try {
      const user = await User.findBy('confirmation_token', params.token)
      const { password, passwordConfirm } = await request.all()
      if (password === passwordConfirm) {
        user.password = password
        user.confirmation_token = null

        await user.save()
        return response.status(200).send({ message: 'Senha alterada com sucesso' })
      } else {
        return response.status(401).send({ error: { message: 'Digite as senhas corretamente' } })
      }
    } catch (err) {
      return response.status(402).send({ error: { message: 'Algo deu errado ao alterar sua senha ' } })
    }
  }
}

module.exports = PasswordResetController
