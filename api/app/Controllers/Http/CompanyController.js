'use strict'
const Company = use('App/Models/Company')

class CompanyController {
  async index () {
    const company = await Company.all()
    return company
  }

  async store ({ request }) {
    const data = request.only([
      'corporate_name',
      'fantasy_name',
      'email',
      'cnpj',
      'address',
      'zipcode'
    ])

    const company = await Company.create(data)
    return company
  }

  async show ({ params }) {
    const company = await Company.findOrFail(params.id)
    await company.load('users')
    return company
  }

  async update ({ params, request }) {
    const company = await Company.findOrFail(params.id)
    const data = request.only([
      'corporate_name',
      'fantasy_name',
      'email',
      'cnpj',
      'address',
      'zipcode'
    ])

    company.merge(data)
    company.save()
    return company
  }

  async destroy ({ params, response }) {
    const company = await Company.findOrFail(params.id)
    const companyDelete = await company.delete()

    if (companyDelete) {
      return response.status(201).send({ message: 'Company Deleted' })
    }
  }
}

module.exports = CompanyController
