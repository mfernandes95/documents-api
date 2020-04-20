import React, { Component } from 'react'
import api from '../../../services/api'
import { uniqueId } from 'lodash'
import filesize from 'filesize'
import { MdRemoveRedEye } from 'react-icons/md';
import GetAppIcon from '@material-ui/icons/GetApp';
import { MDBDataTable } from 'mdbreact';
import { Link } from 'react-router-dom';
import ContractFileUpload from 'components/Contracts/FileUpload/index'
import FileList from 'components/Contracts/FileList/index'
import { Background, Container, Title, Contracts, Wrapper, Body, ContractUpload } from './styles'

class Contract extends Component {
	uploadedFiles = [];

	constructor() {
		super();

		this.state = {
			contract: [],
			uploadedFiles: [],
			imageFile: String,
			subtype: String,
			name: String,
		}
	}

	componentDidMount() {
		const contract_id = this.props.match.params.id;
		api.get(`contracts/${contract_id}`)
			.then(res => this.setState({
				contract: res.data,
			}))
			.catch(err => console.log(err))
	}

	getImage = (contract_id, file_id) => {
		return api.get(`/contracts/${contract_id}/files/${file_id}`)
			.then(res => this.setState({
				imageFile: res.data.message,
				subtype: res.data.file.subtype,
				name: res.data.file.name
			}))
			.catch(err => console.log(err))
	}

	handleUpload = files => {
		this.uploadedFiles = files.map(file => ({
			file,
			id: uniqueId(),
			name: file.name,
			readableSize: filesize(file.size),
			preview: URL.createObjectURL(file),
			progress: 0,
			uploaded: false,
			error: false,
		}))

		this.setState({
			uploadedFiles: this.state.uploadedFiles.concat(this.uploadedFiles)
		});
	};

	submitFiles = () => {
		this.uploadedFiles.forEach(this.processUpload)
	}

	updateFile = (id, data) => {
		this.setState({
			uploadedFiles: this.state.uploadedFiles.map(uploadedFile => {
				return id === uploadedFile.id ? { ...uploadedFile, ...data } : uploadedFile;
			})
		})
	}

	processUpload = (uploadedFile) => {
		const contract_id = this.props.match.params.id;
		const data = new FormData();
		data.append('file[]', uploadedFile.file, uploadedFile.name)
		api
			.post(`contracts/${contract_id}/files`, data,
				{
					onUploadProgress: e => {
						const progress = parseInt(Math.round((e.loaded * 100) / e.total));
						this.updateFile(uploadedFile.id, {
							progress,
						})
					}
				}
			).then(response => {
				this.updateFile(uploadedFile.id, {
					uploaded: true,
					id: response.data._id,
				})
			}).catch(e => {
				console.log('erro', e)
				this.updateFile(uploadedFile.id, {
					error: true,
				})
			});
	};

	render() {
		const { contract, uploadedFiles, subtype, imageFile } = this.state
		const data = {
			columns: [
				{
					label: 'Nome',
					field: 'nome',
					sort: 'asc',
					width: 150
				},
				{
					label: 'Detalhes',
					field: 'detalhes',
					sort: 'asc',
					width: 150
				},
			],

			rows:
				contract.files ? contract.files.map(files => ({
					nome: files.name,
					detalhes: files.subtype === 'jpeg' || files.subtype === 'png' || files.subtype === 'jpg' ? < a
						target="_blank"
						rel="noopener noreferrer"
						href={`/contracts/${files.contract_id}/files/${files.id}`
						}
					>
						<MdRemoveRedEye className="eyes" />
					</a > :
						<button
							type="button"
							onClick={() => this.getImage(files.contract_id, files.id)}
							className="btn buttonDownload"
						>
							<a
								href={`data:image/${subtype};base64,` + imageFile}
								download={files.name}
							>
								<GetAppIcon />
							</a>
						</button>

				})
				) : null
		};

		return (
			<Wrapper>
				<Background>
					<Container className="container teste" >
						<Title> Detalhes do contrato</Title>
						<div className="ContractFiles">
							<Contracts key={contract.id}>
								<div className="components">
									<span>Título: </span>
									<h4>{contract.title}</h4>
								</div>
								<div className="components">
									<span>Descrição: </span>
									<h4>{contract.description}</h4>
								</div>
								<div className="components">
									<span>Valor: </span>
									<h4>{contract.value ? new Intl.NumberFormat("pt-BR", {
										style: "currency",
										currency: "BRL"
									}).format(contract.value.replace(/[^\d.]+/g, '')) : 0}</h4>
								</div>
							</Contracts>
							<ContractUpload className="">
								<ContractFileUpload onUpload={this.handleUpload} />
								{!!uploadedFiles.length && (<FileList files={uploadedFiles} />)}
								<button
									className="btn btn-primary buttonUpload"
									type="submit"
									onClick={this.submitFiles}
								>
									Enviar
								</button>
							</ContractUpload>
						</div>
						<Body>
							<MDBDataTable
								className="tables"
								striped
								bordered
								small
								info={false}
								displayEntries={false}
								data={data}
							/>
						</Body>
						<Link to="/admin/contract">
							<button className="btn btn-primary buttonBack" type="button">Voltar</button>
						</Link>
					</Container>
				</Background>
			</Wrapper >
		)
	}
}

export default Contract
