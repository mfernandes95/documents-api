import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useParams } from "react-router";
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { Wrapper, Title, Formulario } from './styles';
import api from '../../services/api'
import history from '../../services/history';

const schema = Yup.object().shape({
  password: Yup
    .string()
    .min(8, 'A senha deve conter o minimo de 8 caracteres')
    .required('Digite uma nova senha'),
  password_confirm: Yup
    .string()
    .min(8, 'A senha deve conter o minimo de 8 caracteres')
    .required('Confirme sua senha')
});

export default function ResetPassword() {
  const NewToken = useParams()
  const token = NewToken.token
  useEffect(() => {
    setTokened(token)

    api.get(`/cadastro/confirmacao/${token}`)
      .then(() => {
        history.push('/recuperacao/senha/:')
      })
      .catch(() => {
        history.push('/error')
      })

  }, [token]);

  const [password, setPassword] = useState();
  const [tokened, setTokened] = useState();
  const [passwordConfirm, setPassowrdConfirm] = useState();

  function update() {
    api.put(`/reset/password/${tokened}`, {
      password,
      passwordConfirm
    }).then(() => {
      setPassword('')
      setPassowrdConfirm('')
      toast.success('Sua senha foi alterada com Sucesso')
    })
      .catch((e => {
        console.log('algo deu errado', e)
        toast.error('Houve um erro, tente novamente')
      }))
  }

  return (
    <Wrapper>
      <Title className="card">
        <h2>Cadastro de nova senha</h2>
        <Formulario>
          <Form schema={schema} onSubmit>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              type="password"
              placeholder="Digite sua nova senha"
            />
            <Input
              value={passwordConfirm}
              onChange={(e) => setPassowrdConfirm(e.target.value)}
              name="password_confirm"
              type="password"
              placeholder="Confirme sua senha"
            />
            {
              password !== passwordConfirm ?
                <button
                  className="buttonDisabled"
                  type="submit"
                  disabled
                >
                  Enviar
                 </button>
                :
                <button
                  type="submit"
                  onClick={update}
                >
                  Enviar
                 </button>
            }
            <Link to="/">
              <button type="button">Voltar</button>
            </Link>
          </Form>
        </Formulario>
      </Title>
    </Wrapper>
  );
}
