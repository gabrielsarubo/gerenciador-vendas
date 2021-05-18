import React from 'react';
import './home.css';
import Navbar from '../../components/navbar';

function Home() {
	return (
		<>
			<Navbar />
			<div className="container-fluid">
				<div className="row g-4">
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
									<input type="text" className="form-control" id="inputEstoque" readOnly />
								</div>
								{/* Price field */}
								<div className="col-2">
									<label htmlFor="inputPrice" className="form-label">Preço</label>
									<input type="text" className="form-control" id="inputPrice" readOnly />
								</div>
								{/* Quantity field */}
								<div className="col-2">
									<label htmlFor="inputQuantity" className="form-label">Quantidade</label>
									<input type="text" className="form-control" id="inputQuantity" />
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
								<button className="btn btn-outline-primary">Cadastrar</button>
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
					<div className="col-md-4">
						<section className="p-3 bg-light">
							<h2 className="h4 mb-4">Carrinho</h2>

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