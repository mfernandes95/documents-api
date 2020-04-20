import styled from 'styled-components';
import { darken } from 'polished';
import logo from '../../assets/img/energia-fundo.jpg'

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
  padding: 65px;

  h2 {
    color: #676666;
    display: flex;
    justify-content: center;
    margin-bottom: 50px;
  }
`;

export const Message = styled.div`
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    margin-bottom: 0;
  }

  input {
    background: rgba(255, 255, 255, 0.6);
    border: 1px solid #676666;
    border-radius: 3px;
    height: 40px;
    width: 350px;
    padding: 0 15px;
    color: #676666;}

    &::placeholder {
      color: #676666;
    }

  .button {
    width: 350px;
    height: 44px;
    margin-top: 10px;
    margin-bottom: 5px;
    background: #1f77bc;
    font-weight: bold;
    color: #fff;
    border: 0;
    border-radius: 5px;
    font-size: 16px;
    transition: background 0.2s;
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
    width: 350px;
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
