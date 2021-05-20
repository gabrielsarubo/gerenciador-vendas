import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store, persistor } from '../src/store'
import {PersistGate} from 'redux-persist/integration/react';
 
//Pages
import Login from './view/login';
import Cadastro from './view/cadastro';
import Home from './view/home';
import Produto from './view/produto';
import Relatorio from './view/relatorio';

function App() {
  return (
    <Provider store = {store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Route exact path='/' component={Login}/>
          <Route exact path='/cadastrar' component={Cadastro}/>
          <Route exact path='/home' component={Home}/>
          <Route exact path='/produto' component={Produto}/>
          <Route path='/produto/:idProduto' component={Produto}/>
          <Route exact path='/relatorio' component={Relatorio}/>
        </Router>
      </PersistGate>
    </Provider>

  );
}

export default App;
