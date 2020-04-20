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
  height: 500px;

  h2 {
    color: #676666;
    display: flex;
    justify-content: center;
    margin-top: 50px;
    margin-bottom: 0;
  }
`;

export const Message = styled.div`
  color: #676666;
  display: flex;
  margin-top: 150px;
  flex-direction: column;
  align-items: center;
  font-size: 20px;

  p {
    margin-bottom: 0;
  }
`;

export const Redirect = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 120px;

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

`;