'use strict'
const Contract = use('App/Models/Contract')

class ContractController {
  async index ({ auth }) {
    const contract = await Contract.query()
      .with('user')
      .where('user_id', auth.user.id)
      .fetch()
    return contract
  }

  async store ({ request, response, auth }) {
    const data = request.only([
      'title',
      'description',
      'value'
    ])
    data.value = data.value.replace(/[^\d]+/g, '') / 100

    const contract = await Contract.create({ ...data, user_id: auth.user.id })
    return contract
  }

  async show ({ params, request, response, view }) {
    const contract = await Contract.findOrFail(params.id)

    await contract.load('user')
    await contract.load('files')
  }

  async update ({ params, request, response }) {
    const contract = await Contract.findOrFail(params.id)
    const data = request.only([
      'title',
      'description',
      'value'
    ])

    contract.merge(data)
    await contract.save()

    return contract
  }

  async destroy ({ params, request, response }) {
    const contract = await Contract.findOrFail(params.id)
    const contractDelete = await contract.delete()

    if (contractDelete) {
      return response.status(201).send({ message: 'Contract deleted' })
    }
  }
}

module.exports = ContractController
