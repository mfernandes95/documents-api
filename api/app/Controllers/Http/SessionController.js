'use strict'
const Database = use('Database')
const Yup = use('yup')

class SessionController {
  async store({ request, response, auth }) {
    const schema = Yup.object().shape({
      email: Yup.string().required(),
      password: Yup.string().min(8).required(),
    })

    if (!(await schema.isValid(request.body))) {
      return response.status(401).json({
        error: 'Erro na validação, verifique seus dados',
      })
    }

    try {
      const { email, password } = request.all()
      const token = await auth.attempt(email, password)
      const user = await Database.table('users').where('email', email).first()

      if (user.account_status == 1) {
        return response.status(201).send(token)
      } else {
        return response.status(400).send({
          error: {
            message: 'Verifique o seu e-mail, para confirmar o cadastro',
          },
        })
      }
    } catch (err) {
      return response.status(401).send({
        error: { message: 'verifique seus dados e tente novamente!' },
      })
    }
  }
}

module.exports = SessionController
