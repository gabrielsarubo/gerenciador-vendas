import React, {useState} from 'react';
import './login.css';
import firebase from '../../config/firebase';
import 'firebase/auth';

import {Link, Redirect} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


function Login() {

    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [mensagem, setMensagem]  = useState();

    const dispatch = useDispatch();

    function autenticar() {
        firebase.auth().signInWithEmailAndPassword(email,senha).then(resultado => {
            setMensagem('ok')
            setTimeout(() => {dispatch({type: 'LOGIN', usuarioEmail: email})},2000)
            
        })
        .catch(erro => {
            setMensagem('erro')
        })
    }

    return(
        <>
        <div className="login-content">

            {
                useSelector(state => state.usuarioLogado) > 0 ? <Redirect to="/home" /> : null
            }

            <form className="form-login text-center mx-auto mt-1">
                <div className="d-flex flex-column align-items-center">
                    <div className="flex-item">
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="rgba(47, 65, 100, 0.26)" className="bi bi-shop" viewBox="0 0 16 16">
                            <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zM4 15h3v-5H4v5zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3zm3 0h-2v3h2v-3z"/>
                        </svg>
                    </div>
                    <div className="flex-item">
                        <h1 className="h3 my-4 fw-light">Gerenciador de Vendas</h1>  
                    </div>
                </div>
                <div className="d-flex flex-column">
                    <div className="flex-item">
                        <input onChange = {(e) => setEmail(e.target.value)} type="email" className="form-control mb-2" placeholder="Email"/>
                    </div>
                    <div className="flex-item">
                        <input onChange = {(e) => setSenha(e.target.value)} type="password" className="form-control" placeholder="Senha"/>
                    </div>      
                </div>

                <div className="d-flex my-4 justify-content-between flex-wrap">
                    <div className="flex-item my-auto">
                        <div className="opcoes">
                            <Link to='/cadastrar' className="mx-1 ">CADASTRE-SE</Link>
                        </div>
                    </div>
                    <div className="flex-item">
                        <button className="btn w-100 btn-lg btn-entrar" onClick={autenticar} type="button">ENTRAR</button>
                    </div>
                </div>
                           
                <div className="text-center my-4">
                    {mensagem === 'ok' && <span>&#9745;  Você conectou com sucesso!</span>}
                    {mensagem === 'erro' && <span><strong>&#9888;  Atenção! </strong> Email ou senha estão incorretas.</span>}
                </div>

            </form>
        </div>
       </> 
    ); 
}

export default Login;