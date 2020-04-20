import React from 'react';
import { Link } from 'react-router-dom'
import { Wrapper, Title } from './styles';

export default function Errorpage() {
  return (
    <Wrapper>
      <Title>Error 404</Title>
      <strong>Ocorreu algum erro, tente novamente</strong>
      <Link className="button" to="/">
        <button>Voltar a página de login</button>
      </Link>
    </Wrapper>
  );
}
