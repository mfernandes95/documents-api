import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { Wrapper, Content, Login, Formulario } from './styles';
import '../../config/ReactotronConfig';
import { signUpRequest } from '../../store/modules/auth/actions';

const schema = Yup.object().shape({
  username: Yup.string().required('Seu nome e sobrenome é obrigatório'),
  email: Yup.string('Insira um e-mail válido').required('O e-mail é obrigatório'),
  password: Yup.string().min(8, 'A senha deve conter mais que 8 caracteres').required('A senha é obrigatória'),
  password_confirm: Yup.string().min(8, 'A senha deve conter mais que 8 caracteres').required('Confirme sua senha')
});

export default function SignUp() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ username, email, password }) {
    dispatch(signUpRequest(username, email, password));
  }

  const toInputUppercase = e => {
    e.target.value = ("" + e.target.value).toLowerCase();
  };

  const [password, setPassword] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState();

  return (
    <Wrapper>
      <Content />
      <Login className="d-flex justify-content-center">
        <Form schema={schema} onSubmit={handleSubmit}>
          <Formulario className=" isTitle card align-items-center">
            <h2 className="card-subtitle mb-2 message">
              Bem vindo, crie a sua conta
            </h2>
            <Input
              autoComplete="off"
              name="username"
              type="text"
              placeholder="Digite seu nome completo"
            />
            <Input
              onInput={toInputUppercase}
              autoComplete="off"
              name="email"
              type="email"
              placeholder="Digite um e-mail"
            />
            {
              !!password && password !== passwordConfirm ? <Input
                className="inputErrors"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                type="password"
                placeholder="Digite uma senha"
              />
                :
                <Input
                  onInput={toInputUppercase}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  type="password"
                  placeholder="Digite uma senha"
                />
            }
            {
              !!password && password !== passwordConfirm ? <Input
                className="inputErrors"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                name="password_confirm"
                type="password"
                placeholder="Confirme sua senha"
              />
                :
                <Input
                  onInput={toInputUppercase}
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  name="password_confirm"
                  type="password"
                  placeholder="Confirme sua senha"
                />
            }
            {
              password !== passwordConfirm ?
                <button
                  className="buttonDisabled"
                  type="submit"
                  disabled
                >
                  {loading ? 'Carregando...' : 'Criar conta'}
                </button>
                :
                <button
                  type="submit"
                >
                  {loading ? 'Carregando...' : 'Criar conta'}
                </button>
            }
            <Link className="ForgetPassword" to="/">
              Já é cadastrado? Clique aqui!
            </Link>
          </Formulario>
        </Form>
      </Login>
    </Wrapper>
  );
}
