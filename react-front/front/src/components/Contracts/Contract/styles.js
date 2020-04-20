import styled from 'styled-components';
import logo from '../../../assets/img/energia-fundo.jpg'
import { darken } from 'polished';

export const Wrapper = styled.div`
  `;

export const Background = styled.div`
  background: url(${logo}) no-repeat,	#2AA5B2;
  background-attachment: fixed;
  padding: 17px;
  min-height: calc(100vh - 0px);

  `;

export const Container = styled.div`
  background: rgba(255, 255, 255, 0.96);
  padding: 20px 30px 20px 30px !important;
  border-radius: 5px;
  height: 100%;

  .button {
    width: 210px;
    margin: 15px 0 10px 0 ;
  }

  .buttonDownload {
    color: #007bff;
  }

  .ContractFiles {
    display: flex;
    justify-content: space-between;
  }

  .buttonBack {
    width: 210px;
    position: absolute;
    margin-top: -51px;
  }

`;

export const Title = styled.div`
  font-size: 40px;
  text-align: center;
  color: rgba(0, 0, 0, 0.67);
`;

export const Contracts = styled.div`

  .components {
    margin-top: 5px;
  }

  span {
    color: rgba(0, 0, 0, 0.46);
  }

  h4 {
    margin-bottom: 20px;
    color: rgba(0, 0, 0, 0.59);
  }

  .button {
    width: 210px;
    margin: 5px 0 10px 0 ;
  }
`;

export const ContractUpload = styled.div`
  margin-top: 25px;

  .sc-kAzzGY {
      height: 200px;
      width: 750px;
      margin-bottom: 0;
    }

  .ibMUvQ {
    padding: 100px 150px;
    font-size: 35px;
    }

  .buttonUpload {
    margin-top: 10px;
  }

`;

export const Icon = styled.div`
  display: flex;
  align-items: center;
`;

export const Body = styled.div`
  margin-top: 20px;

  thead {
    tr {
      text-align: center;
    }
  }

  tbody {
    text-align: center;
  }

  .dataTables_filter {
    display: flex;
    justify-content: flex-end;

    input {
      width: 208px;
    }
  }

  .igzzaT {
    margin-top: 80px;
  }

  .tables {
    position: relative
  }
`;

export const Files = styled.div`
  display: flex;
  margin: 15px 0 20px 0;

  a {
    margin-left: 20px;

    .eyes {
      font-size: 24px;
    }
  }
`;

// --------------------------------- IMAGE STYLES -----------------------------//

export const Wrappers = styled.div`
  background: url(${logo}) no-repeat,	#2AA5B2;
  min-height: 100vh;
   display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Image = styled.div`

  img {
      border-radius: 10px;
      width: 1400px;
      height: 550px;
    }
`;

export const Download = styled.div`

  button {
    width: 350px;
    margin: 10px 40px 0 40px;
    height: 44px;
    background: #1f77bc;
    font-weight: bold;
    color: #fff;
    border: 0;
    border-radius: 5px;
    font-size: 16px;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.03, '#1f77bc')};
    }
  }
`;

