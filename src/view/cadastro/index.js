import React, {useState} from 'react';
import './cadastro.css'
import {Link} from 'react-router-dom';
import firebase from '../../config/firebase';
import 'firebase/auth'
import Spinner from 'react-bootstrap/Spinner'

function Cadastro(){

    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [msgTipo, setTipoMsg] = useState();
    const [mensagem, setMsg]  = useState();
    const [carregando, setCarregando] = useState();

    function cadastrar(){
        setTipoMsg(null);
        setCarregando(1);

        if(!email || !senha) {
            setTipoMsg('erro');
            setMsg('Você não preencheu todos os campos');
        }
        firebase.auth().createUserWithEmailAndPassword(email,senha).then(resultado =>{
            setTipoMsg('ok');
            setCarregando(0);
        }).catch(erro =>{
            setTipoMsg('erro');
            setCarregando(0);
            switch(erro.message){
                case 'Password should be at least 6 characters':
                    setMsg('A senha deve ter pelo menos 6 caracteres.');
                    break;
                case 'The email address is already in use by another account.':
                    setMsg('Essa conta já existe.');
                    break;
                case 'The email address is badly formatted.':
                    setMsg('O formato do e-mail é inválido');
                    break;
                default:
                    setMsg('Não foi possível realizar o Cadastro.');
                    break;
            }
        });
    }

    return(
        <>
        <div className="cadastro-content">
            <form className="form-cadastro">
                <div className="d-flex flex-column align-items-center">
                    <div className="flex-item">
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="rgba(47, 65, 100, 0.26)" className="bi bi-shop" viewBox="0 0 16 16">
                            <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zM4 15h3v-5H4v5zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3zm3 0h-2v3h2v-3z"/>
                        </svg>
                    </div>
                    <div className="flex-item">
                        <h1 className="h3 my-4 fw-normal">Crie sua conta!</h1>
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
                            <Link to='/' className="opcoes">ENTRAR</Link>
                        </div>
                    </div>
                    <div className="flex-item">
                        { carregando ? <Spinner className="" animation="border" variant="success" role="status"></Spinner>
                            : <button onClick={cadastrar} type="button" className="btn btn-lg btn-cadastro">CADASTRAR</button>
                        }
                    </div>
                </div>
                
                <div className="text-center my-4">
                    {msgTipo === 'ok' && <span>&#9745;  Cadastro realizado com sucesso</span>}
                    {msgTipo === 'erro' && <span><strong>&#9888;  Atenção! </strong>{mensagem}</span>}
                </div>

            </form>
        </div>
        </>
    )
}

export default Cadastro;

