'use strict'
const File = use('App/Models/File')
const Contract = use('App/Models/Contract')
const Helpers = use('Helpers')
const fs = use('fs')
const path = use('path')

class FileController {
  async index ({ params, response, auth }) {
    const user = auth.user.id
    const file = await File.query()
      .with('user')
      .where('contract_id', params.contracts_id)
      .where('user_id', user)
      .fetch()
    return response.status(201).json({ message: file, data: user })
  }

  async store ({ params, request, auth, response }) {
    try {
      if (!request.file('file')) {
        return response.status(401).send({ message: 'Adicione arquivos para fazer o upload' })
      }

      const contract = await Contract.findOrFail(params.contracts_id)
      const validationOptions = {
        size: '2mb',
        extnames: ['png', 'jpeg', 'jpg', 'pdf', 'doc', 'zip', 'odt', 'docx']
      }
      const files = request.file('file', validationOptions)

      await files.moveAll(Helpers.tmpPath('uploads'), file => ({
        name: `${Date.now()}-${file.clientName}`
      }))

      if (!files.movedAll()) {
        throw files.errors()
      }

      const fileUpload = await Promise.all(
        files
          .movedList()
          .map(file => contract.files().create({
            file: file.fileName,
            name: file.clientName,
            type: file.type,
            subtype: file.subtype,
            user_id: auth.user.id
          }, console.log(files)))
      )

      if (fileUpload) {
        return response.status(201).send({ message: 'File upload success' })
      }
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: 'Upload failed' } })
    }
  }

  async show ({ params, response }) {
    const file = await File.findOrFail(params.id)

    var bitmap = fs.readFileSync(`${path.resolve(__dirname, '../../../tmp/uploads')}/${file.file}`)
    return response.send({ message: Buffer.from(bitmap).toString('base64'), file })
  }

  async destroy ({ params, response }) {
    const file = await File.findOrFail(params.id)
    const fileDelete = await file.delete()

    if (fileDelete) {
      return response.status(201).send({ message: 'File Deleted' })
    }
  }
}

module.exports = FileController
