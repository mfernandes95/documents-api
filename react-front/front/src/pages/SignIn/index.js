import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { Wrapper, Content, Login, Formulario } from './styles';
import { signInRequest } from '../../store/modules/auth/actions';
import '../../config/ReactotronConfig';

const schema = Yup.object().shape({
  email: Yup.string('Insira um Username válido').required('O e-mail é obrigatório'),
  password: Yup.string().min(8, 'A senha deve conter mais que 8 caracteres').required('A senha é obrigatória'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  const toInputUppercase = e => {
    e.target.value = ("" + e.target.value).toLowerCase();
  };

  return (
    <Wrapper>
      <Content />
      <Login className="">
        <Form schema={schema} onSubmit={handleSubmit}>
          <Formulario className=" isTitle card align-items-center">
            <h2 className="card-subtitle mb-2 message">
              Bem vindo, faça o Login
            </h2>
            <Input
              onInput={toInputUppercase}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              type="text"
              placeholder="Insira seu e-mail"
            />
            <Input
              onInput={toInputUppercase}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              type="password"
              placeholder="Insira sua senha"
            />
            {
              email && password !== '' ?
                <button
                  type="submit"
                >
                  {loading ? 'Carregando...' : 'Entrar'}
                </button>
                :
                <button
                  className="buttonDisabled"
                  type="submit"
                  disabled
                >
                  {loading ? 'Carregando...' : 'Entrar'}
                </button>
            }
            <Link className="register" to="/cadastro">
              <button
                className="buttonRegister"
                type="submit"
              >
                Cadastre-se aqui
               </button>
            </Link>
            <Link className="ForgetPassword" to="/recuperacao-senha">
              Esqueceu a senha?
            </Link>
          </Formulario>
        </Form>
      </Login>
    </Wrapper>
  );
}
