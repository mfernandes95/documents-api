import React from 'react';
import { Link } from 'react-router-dom';
import { Wrapper, Title, Message, Redirect } from './styles';

export default function RegisteredSuccess() {
  return (
    <Wrapper>
      <Title className="card">
        <h2>Confirmação de cadastro</h2>
        <Message>
          <p>Parabéns, estamos quase lá.</p>
          <p>Verique o seu e-mail para a confirmação do cadastro</p>
        </Message>
        <Redirect>
          <Link to="/">
            <button>Clique aqui para voltar</button>
          </Link>
        </Redirect>
      </Title>
    </Wrapper>
  )
}
