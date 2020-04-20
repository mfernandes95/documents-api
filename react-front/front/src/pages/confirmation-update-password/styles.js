import styled from 'styled-components';
import { darken } from 'polished';
import logo from '../../assets/img/energia-fundo.jpg';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: url(${logo}), #2AA5B2;
  height: 100vh;
  width: 100vw;
`;

export const Title = styled.div`
  background: rgba(255, 255, 255, 0.9) !important;
  width: 500px;
  height: 500px;
  padding: 65px;

  h2 {
    color: #676666;
    display: flex;
    justify-content: center;
    margin-bottom: 0;
  }
`;

export const Formulario = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 20px;

  Form {
    display: flex;
    flex-direction: column;
    margin-top: 60px;
  }

  Input {
    background: rgba(255, 255, 255, 0.6);
    border: 1px solid #676666;
    border-radius: 3px;
    color: #676666;
    height: 40px;
    padding: 0 15px;
    margin: 0 0 10px;
    width: 350px;

    &::placeholder {
      color: #676666;
      font-size: 18px;
    }
  }

  span {
    align-self: flex-start;
    padding-left: 10px;
    font-size: 13px;
    margin-top: -10px;
    margin-bottom: 15px;
    color: red;
  }

  button {
    background: #1f77bc;
    border: 0;
    border-radius: 5px;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    height: 44px;
    margin: 5px 0 5px;
    transition: background 0.2s;
    width: 350px;

    &:hover {
      background: ${darken(0.03, '#1f77bc')};
    }
  }

  .buttonDisabled {
    background: #50a3e2;

    &:hover {
      background: ${darken(0.02, '#50a3e2')};
    }
  }

`;

export const Redirect = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-top: 120px;
`;