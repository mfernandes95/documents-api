import React from "react";
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import ReactDOM from "react-dom";
import './config/ReactotronConfig';
import history from './services/history'
import { Router, Switch } from "react-router-dom";
import Route from './Route'
import { store, persistor } from './store';

// core components
import SignIn from './pages/SignIn';
import ConfirmationUpdate from './pages/confirmation-update-password';
import SingUp from './pages/SignUp';
import verificationEmail from './pages/verification-email';
import ResetPassword from './pages/reset_password';
import ContractPage from "./views/Dashboard/Dashboard";
import Admin from "layouts/Admin.js";
import ErrorPage from './pages/Error-page'
import RegisterConfirmation from './pages/register_confirmation';
import RTL from "layouts/RTL.js";
import { ToastContainer } from 'react-toastify';
import GlobalStyle from './styles/global';
import Contract from './components/Contracts/Contract/index';
import Imagem from './components/Contracts/Contract/image';
// import "assets/css/material-dashboard-react.css?v=1.8.0";
import 'bootstrap/dist/css/bootstrap.min.css'

// import "assets/css/material-dashboard-react.css?v=1.8.0";
import 'bootstrap/dist/css/bootstrap.min.css'

function Tost() {
  return (
    <>
      <GlobalStyle />
      <ToastContainer autoClose={3000} />
    </>
  );
}

ReactDOM.render(
  <Provider store={store} >
    <PersistGate persistor={persistor}>
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={SignIn} />
          <Route path="/recuperacao/senha/:token" component={ConfirmationUpdate} />
          <Route path="/cadastro" component={SingUp} />
          <Route path="/cadastrado" component={verificationEmail} />
          <Route path="/recuperacao-senha" component={ResetPassword} />
          <Route path="/admin" component={Admin} isPrivate />
          {/* <Redirect from="/admin" to="/admin/dashboard" /> */}
          <Route path="/admin/contract" component={ContractPage} isPrivate />
          <Route path="/error" component={ErrorPage} />
          <Route path="/registro/confirmado/:token" component={RegisterConfirmation} />
          <Route path="/rtl" component={RTL} isPrivate />
          <Route path="/contract/:id" component={Contract} isPrivate />
          <Route path="/contracts/:contract_id/files/:id" component={Imagem} isPrivate />
        </Switch>
        <Tost />
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
