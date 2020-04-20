'use strict'
const Route = use('Route')

// logar com o usuario
Route.post('login', 'SessionController.store')
// registrar um usuario
Route.post('register', 'UserController.store')
// gerar um novo token randomico
Route.post('forgot-password', 'VerifyEmailController.store')
// verificação de e-mail
Route.get('/cadastro/confirmacao/:token', 'VerifyEmailController.show')
// esqueceu a senha
Route.put('/reset/password/:token', 'PasswordResetController.update')

Route.resource('users', 'UserController')
  .apiOnly()
  .validator(new Map(
    [
      [
        ['users.store'],
        ['User']
      ]
      // [
      //   ['users.update'],
      //   ['User']
      // ],
    ]
  ))

Route.resource('companies', 'CompanyController')
  .apiOnly()

Route.group(() => {
  Route.resource('contracts', 'ContractController')
    .apiOnly()

  Route.resource('contracts.files', 'FileController')
    .apiOnly()
}).middleware(['auth:jwt'])
