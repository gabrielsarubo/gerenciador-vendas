import React from 'react';
import './home.css';
import Navbar from '../../components/navbar';

function Home() {
	const handleChange = () => {}
	
	return (
		<>
			<Navbar />
			<div className="Home container-fluid h-100">
				<div className="row g-4 h-100">
					{/* PANEL LEFT, for Adding Products and Listing them */}
					<div className="col-md-8 pt-3">
						<h1 className="h3 mb-3">Painel</h1>

						{/* Section for adding products */}
						<section className="mb-4 p-3 bg-light">
							<form className="row g-3 align-items-end">
								{/* Product field */}
								<div className="col-4">
									<label htmlFor="inputProduct" className="form-label">Produto</label>
									<select id="inputProduct" className="form-select">
										<option defaultValue >Pesquise</option>
										<option value="1">One</option>
										<option value="2">Two</option>
										<option value="3">Three</option>
									</select>
								</div>

								{/* Estoque field */}
								<div className="col-2">
									<label htmlFor="inputEstoque" className="form-label">Estoque</label>
									<input type="text" className="form-control" id="inputEstoque" onChange={handleChange} value="20" readOnly />
								</div>
								{/* Price field */}
								<div className="col-2">
									<label htmlFor="inputPrice" className="form-label">Preço</label>
									<input type="text" className="form-control" id="inputPrice" onChange={handleChange} value="R$ 100,00" readOnly />
								</div>
								{/* Quantity field */}
								<div className="col-2">
									<label htmlFor="inputQuantity" className="form-label">Quantidade</label>
									<input type="text" className="form-control" id="inputQuantity" onChange={handleChange} value="8" />
								</div>
								{/* Submti button */}
								<div className="col-2">
									<button type="submit" className="btn btn-primary w-100">Adicionar</button>
								</div>
							</form>
						</section>

						{/* Section for Listing products from Estoque */}
						<section className="p-3 bg-light">
							<header className="mb-3 d-flex justify-content-between align-items-center">
								<h3 className="h5">Lista de Produtos</h3>
								<button className="btn btn-outline-primary">
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
										<path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
									</svg>
									Cadastrar
								</button>
							</header>

							{/* List of products do Estoque */}
							<table className="table table-hover">
								<thead>
									<tr>
										<th scope="col">Nome</th>
										<th scope="col">Descrição</th>
										<th scope="col">Estoque</th>
										<th scope="col">Preço</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<th scope="row">Nome do produto</th>
										<td>Uma descrição bem legal e breve para o produto</td>
										<td>16</td>
										<td>R$ 120,00</td>
									</tr>
									<tr>
										<th scope="row">Nome do produto</th>
										<td>Uma descrição bem legal e breve para o produto</td>
										<td>16</td>
										<td>R$ 120,00</td>
									</tr>
								</tbody>
							</table>
						</section>
					</div>

					{/* PANEL RIGHT, for the Shopping Cart */}
					<div className="col-md-4 h-100">
						<section className="shoppping-panel p-3 bg-light h-100">
							<header className="mt-3 mb-5">
								<h2 className="h4 m-0 text-center" style={{ lineHeight: 1 }}>
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-cart-fill" viewBox="0 0 16 16">
										<path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
									</svg>
									&nbsp;Carrinho
								</h2>
							</header>

							<div className="finish-purchase text-center">
								<button className="btn btn-primary">Finalizar Compra</button>
							</div>

							{/* Shopping List of cards */}
							<div className="d-flex flex-column">
								<div className="card-box mb-4">
									<div className="top mb-2 d-flex justify-content-between align-items-center">
										<div className="h6 m-0">Nome do produto</div>
										<div className="h6 m-0">R$ 210,00</div>
									</div>
									<div className="mb-2 text-muted">Breve descrição do produto para o usuário distinguir</div>
									<div className="bottom d-flex justify-content-between">
										<div>Quantidade: 1</div>
										<div className="text-danger">Remover</div>
									</div>
								</div>

								<div className="card-box mb-4">
									<div className="top mb-2 d-flex justify-content-between align-items-center">
										<div className="h6 m-0">Nome do produto</div>
										<div className="h6 m-0">R$ 210,00</div>
									</div>
									<div className="mb-2 text-muted">Breve descrição do produto para o usuário distinguir</div>
									<div className="bottom d-flex justify-content-between">
										<div>Quantidade: 1</div>
										<div className="text-danger">Remover</div>
									</div>
								</div>
							</div>
						</section>
					</div>
				</div>
			</div>
		</>
	);
}

export default Home;