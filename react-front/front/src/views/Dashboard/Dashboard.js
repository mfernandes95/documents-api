import React, { Component } from 'react'
import api from '../../services/api'
import filesize from 'filesize'
import { Input } from 'reactstrap';
import { uniqueId } from 'lodash';
import { toast } from 'react-toastify';
import { Form } from '@rocketseat/unform';
import { Wrapper, Body, Title, Button } from './styles';
import Contracts from '../../components/Contracts/Contracts/index'

export default class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      contracts: [],
      title: "",
      description: "",
      value: "",
      file: [],
      contractId: 0,
    }
  }

  componentDidMount() {
    api
      .get('contracts')
      .then(res => {
        this.setState({ contracts: res.data })
      })
      .catch((err => {
        console.log(err)
      }))
  }

  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value })
  }

  handleInputFileChange = ({ target }) => {
    const form = new FormData();
    form.append('file[]', target.files[0])
    this.setState({
      [target.name]: target.files[0].name,
      form
    })
  }

  valueMoney = ({ target }) => {
    const { value } = target
    const valueReplace = value.replace(/\D/g, "")
    const valueFormatted = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valueReplace / 100)

    this.setState({ [target.name]: valueFormatted })
  }

  createContract = (title, description, value) => {
    return api.post("contracts", { title, description, value })
  }

  removeContract = () => {
    return api.delete(`contracts/${this.state.contractId}`)
  }

  handleUpload = files => {
    const file = [files[0]].map(file => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
    }))

    this.setState({ file });
  };

  insertFile() {
    return api.post(`contracts/${this.state.contractId}/files`, this.state.form)
  }

  handleSubmit = () => {
    const { title, description, value, file } = this.state;

    if (title === '' || description === '' || value === '' || file.length === 0) {
      return toast.error('Favor preencher todos os campos')
    }

    this.createContract(title, description, value)
      .then((res) => {
        this.setState({
          contractId: res.data.id
        })

        this.insertFile()
          .then(() => {
            this.setState((prev) => ({
              contracts: [{ id: this.state.contractId, title, description, value }, ...prev.contracts],
              title: "",
              description: "",
              value: "",
              file: "",
            }))
          })
          .catch(err => {
            console.log(err)
            this.removeContract()
            return toast.error('O contrato não foi criado')
          })
      })
      .catch(err => (console.log(err)))
  }

  render() {
    const { contracts, title, description, value, file } = this.state
    return (
      <Wrapper className="section content">
        <Form onSubmit>
          <Title>
            <Input
              className="title"
              type="text"
              placeholder="Titulo*"
              name="title"
              value={title}
              onChange={this.handleInputChange}
            />
            <Input
              className="description"
              type="textarea"
              placeholder="Descrição*"
              name="description"
              value={description}
              onChange={this.handleInputChange}
            />
            <Input
              className="value"
              type="text"
              name="value"
              value={value}
              placeholder="Digite um valor"
              onChange={this.valueMoney}
            />
            <div className="custom-file mb-4">
              <Input
                className="custom-file-input"
                id="customFileLang"
                type="file"
                name="file"
                value={file.name}
                onChange={this.handleInputFileChange}
              />
              <label className="custom-file-label" htmlFor="customFileLang">
                {file.length <= 0 ? 'Selecione o arquivo*' : `${this.state.file}`}
              </label>
            </div>
            <Button>
              <button
                onClick={this.handleSubmit}
                className="btn btn-primary button"
                type="submit"
              >
                Criar
                </button>
            </Button>
          </Title>

        </Form>
        <Body>
          <div className="column">
            <Contracts contracts={contracts} />
          </div>
        </Body>
      </Wrapper>
    );
  }
}