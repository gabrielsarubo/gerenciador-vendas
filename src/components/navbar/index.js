import React from 'react';
import './navbar.css';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Logo from '../../assets/logo_simbolo.svg'

function Navbar() {

	const dispatch = useDispatch();

	return (
		<nav className="navbar navbar-expand-md navbar-dark">
			<div className="container">
				<Link className="navbar-brand link-home" to="/home">
				<img src={Logo} alt="Logo da marca" className="me-3" />
        Gerenciador de Vendas
			</Link>

				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<i className="fas fa-bars text-white"></i>
				</button>

				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav">
						<li className="nav-item mx-3"><NavLink className="nav-link" to="/home">Painel</NavLink></li>
						<li className="nav-item mx-3"><NavLink className="nav-link" to="/relatorio">Relatório</NavLink></li>
						<li className="nav-item mx-3"><NavLink className="nav-link" onClick={() => dispatch({ type: 'LOGOUT' })} exact to="/">Sair</NavLink></li>
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;