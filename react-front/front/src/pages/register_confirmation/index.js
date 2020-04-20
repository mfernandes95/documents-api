import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from "react-router";
import api from '../../services/api'
import history from '../../services/history';
import { Wrapper, Title, Message, Redirect } from './styles';

export default function RegisteredSuccess() {
  const NewToken = useParams()
  const token = NewToken.token
  useEffect(() => {

    api.get(`/cadastro/confirmacao/${token}`)
      .then(() => {
        console.log("Concluido com Sucesso!")
        history.push('/registro/confirmado/:')
      })
      .catch(() => {
        history.push('/error');
      })

  }, [token]);

  return (
    <Wrapper>
      <Title className="card">
        <h2>Confirmação de cadastro</h2>
        <Message>
          <p>Parabéns, você está cadastrado</p>
        </Message>
        <Redirect>
          <Link to="/">
            <button>Clique aqui para logar</button>
          </Link>
        </Redirect>
      </Title>
    </Wrapper>
  )
}
