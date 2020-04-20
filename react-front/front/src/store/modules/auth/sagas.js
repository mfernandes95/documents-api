import { takeLatest, call, put, all } from 'redux-saga/effects';
import { signInSuccess, signFailure } from './actions';
import { toast } from 'react-toastify'
import history from '../../../services/history';
import api from '../../../services/api';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, '/login', {
      email,
      password,
    });

    const { token } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;
    console.log('token', api.defaults.headers.Authorization)
    yield put(signInSuccess(token));

    history.push('/admin/dashboard');
    yield put(signFailure());

  } catch (err) {
    toast.error('Falha na autenticação, verifique seus dados');
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { username, email, password } = payload;
    yield call(api.post, '/register', {
      username,
      email,
      password,
    });

    history.push('/cadastrado');
    yield put(signFailure());

  } catch (err) {
    toast.error('E-mail em uso, favor inserir outro');
    yield put(signFailure());
  }
}

export function signOut() {
  history.push('/');
}

export function* forgetPasssword({ payload }) {
  try {
    const { email } = payload;

    yield call(api.post, 'forgot-password', {
      email
    })
    toast.success('E-mail enviado')
    yield put(signFailure());

  } catch (err) {
    toast.error('E-mail não cadastrado')
    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;
  console.log(`payload`, payload)
  console.log(token)
  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
  console.log('token', api.defaults.headers.Authorization)

}


export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
  takeLatest('@auth/SIGN_IN_SUCCESS_EMAIL', forgetPasssword),
]);
