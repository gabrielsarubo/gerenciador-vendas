import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
// Redux
import { useSelector } from 'react-redux';
// Firebase
import firebase from '../../config/firebase';
// Componentes
import Navbar from '../../components/navbar';

function Relatorio() {
	// Reference the Firestore database
  const db = firebase.firestore()

	// Lista de vendas do BD
	const [vendas, setVendas] = useState([])
	
	// Get all the Vendas from the DB
	useEffect(() => {
		let listaVendas = []

		db.collection('vendas').get()
			.then(res => {
				res.docs.forEach(doc => {
					listaVendas.push({
						id: doc.id,
						...doc.data()
					})
				})
				
				setVendas(listaVendas)
			})
			.catch(err => {
				console.log('Erro ao recuperar coleção de vendas.');
			})
		
	}, [])
	
	return (
		<>
			<Navbar />
			<div className="Relatorio container">
				<div className="row g-4">
					{/* PANEL LEFT, for Adding Products and Listing them */}
					<div className="col-md-8 pt-4">
						<h1 className="h2 mb-3">Relatório</h1>

						{/* Secao para adicionar uma novo item (produto) no carrinho */}
						<section className="mb-4 p-3 bg-light card">
							<form className="row g-2 align-items-end">
								{/* Start Date field */}
								<div className="col-3">
									<label htmlFor="inputStartDate" className="form-label">Inicio</label>
									<input type="date" className="form-control" id="inputStartDate" />
								</div>
								{/* End Date field */}
								<div className="col-3">
									<label htmlFor="inputEndDate" className="form-label">Final</label>
									<input type="date" className="form-control" id="inputEndDate" />
								</div>
								{/* Submit button */}
								<div className="col-2">
									<button type="submit" className="btn btn-primary w-100">Filtrar</button>
								</div>
							</form>
						</section>

						{/* Section for Listing products from Estoque */}
						<section className="p-3 bg-light card">

							{/* List of products do Estoque */}
							<table className="table table-hover">
								<thead>
									<tr>
										<th scope="col">Código</th>
										<th scope="col">Data</th>
										<th scope="col"className="text-end">Valor total</th>
									</tr>
								</thead>
								<tbody>
									{
										vendas.length ? (
											vendas.map(venda => {
												return (
													<tr key={venda.id}>
														<th scope="row">{venda.id}</th>
														<td>{new Date(venda.data.seconds * 1000).toLocaleDateString()}</td>
														<td className="text-end">{`R$ ${venda.total}`}</td>
													</tr>
												)
											})
										) : (
											<tr>
												<td scope="row" colSpan="3" className="text-center">Nenhuma venda registrada.</td>
											</tr>
										)
									}
								</tbody>
							</table>
						</section>
					</div>

					{/* PANEL RIGHT, for the Shopping Cart */}
					<div className="col-md-4">
						<section className="p-3 bg-light">
							<header className="mt-3 pb-4">
								<h2 className="h4 m-0 text-center" style={{ lineHeight: 1 }}>
									{/* Icone em SVG */}
									&nbsp;Detalhes da Venda
								</h2>
							</header>

							{/* Shopping List of cards */}
							<div className="d-flex flex-column my-4">
								{/* <CartItems carrinho={carrinho} deleteItemCarrinho={deleteItemCarrinho} /> */}
							</div>
						</section>
					</div>
				</div>
			</div>
		</>
	);
}

export default Relatorio;