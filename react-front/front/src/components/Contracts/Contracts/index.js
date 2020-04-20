import React from 'react'
import { MDBDataTable } from 'mdbreact';
import { MdRemoveRedEye } from 'react-icons/md';
import { Tabela } from './styles';

const Contracts = ({ contracts }) => {

  function Formattedvalue(value) {
    const valueReplace = value.replace(/\D/g, "")
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(valueReplace / 100)
  }

  const data = {
    columns: [
      {
        label: 'ID',
        field: 'id',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Título',
        field: 'título',
        sort: 'asc',
        width: 270
      },
      {
        label: 'Descrição',
        field: 'descrição',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Valor',
        field: 'valor',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Detalhes',
        field: 'detalhes',
        sort: 'asc',
        width: 150
      },
    ],

    rows:
      contracts.map(contract => ({
        id: contract.id,
        título: contract.title,
        descrição: contract.description,
        valor: Formattedvalue(contract.value),
        detalhes: <a href={`/contract/${contract.id}`}> <MdRemoveRedEye /></a>
      })),
  };

  return (
    <Tabela>
      <MDBDataTable
        striped
        bordered
        small
        info={false}
        displayEntries={false}
        data={data}
      />
    </Tabela>
  )
}

export default Contracts
