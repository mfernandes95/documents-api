import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { forgotPassword } from '../../store/modules/auth/actions';
import * as Yup from 'yup';
import { Wrapper, Title, Message } from './styles';

const schema = Yup.object().shape({
  email: Yup.string().required('O e-mail é obrigatório'),
});

export default function RegisteredSuccess() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  const [email, setEmail] = useState()

  const toInputUppercase = e => {
    e.target.value = ("" + e.target.value).toLowerCase();
  };

  function handleSubmit({ email }) {
    dispatch(forgotPassword(email))
    setEmail('')
  };


  return (
    <Wrapper>
      <Title className="card">
        <h2>Recuperação de senha</h2>
        <Message>
          <Form schema={schema} onSubmit={handleSubmit} >
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              type="email"
              placeholder="Insira seu e-mail"
              onInput={toInputUppercase}
            />
            {email !== '' ?
              <button
                type="submit"
                className="button"
              >
                {loading ? 'Carregando...' : 'Enviar'}
              </button>
              :
              <button
                type="submit"
                className="buttonDisabled button"
                disabled
              >
                {loading ? 'Carregando...' : 'Enviar'}
              </button>
            }
            <Link to="/">
              <button>Voltar</button>
            </Link>
          </Form>
        </Message>
      </Title>
    </Wrapper>
  )
}
