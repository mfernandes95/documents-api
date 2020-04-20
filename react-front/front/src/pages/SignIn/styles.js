import styled from 'styled-components';
import { darken } from 'polished';
import logo from '../../assets/img/energia-fundo.jpg'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background: url(${logo}) no-repeat,	#2AA5B2;
`;

export const Content = styled.div`
`;

export const Login = styled.div`
`;

export const Formulario = styled.form`
  padding: 65px;
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.9)  !important;

  span {
    align-self: flex-start;
    padding-left: 10px;
    font-size: 13px;
    margin-top: -10px;
    margin-bottom: 15px;
    color: red;
  }

  .message {
    color: #676666;
    align-self: flex-center;
    font-size: 23px;
    padding: 0 0 20px;
    font-family: 'Roboto', sans-serif;
    font-weight: bold;
  }

  .register {
    color: #1f77bc;
    font-weight: bold;
    text-decoration: none;
    transition: 0.2s;
    padding-bottom: 20px;

    &:hover{
      color: ${darken(0.04, '#1f77bc')};
    }
  }

  .ForgetPassword {
    color: #676666;
    font-weight: bold;
    text-decoration: none;
    transition: 0.02s;
    font-size: 18px;
  }

  input {
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
      font-size: 18px
    }
  }

  button {
    width: 350px;
    margin: 5px 0 5px;
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

  .buttonDisabled {
    background: #50a3e2;

    &:hover {
      background: ${darken(0.02, '#50a3e2')};
    }
  }
`;
