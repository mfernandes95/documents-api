import styled from 'styled-components'

export const Tabela = styled.div`

  thead {
    tr {
        text-align: center;
    }
  }

tbody {

  td {
    text-align: center;
    width: 500px;
  }
}

.dataTables_filter {
  display: flex;
  justify-content: flex-end;
}

label {
  display: flex;
  width: 150px;
  flex-direction: column;
  margin-bottom: 5px;
  justify-content: flex-end;
}
`;