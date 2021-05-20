import React, {useState, useEffect, useRef} from 'react';
import { useSelector} from 'react-redux';
import firebase from '../../config/firebase';
import './home.css';
import Navbar from '../../components/navbar';
import { Link } from 'react-router-dom';
import CartItems from '../../components/CartItems';

function Home() {
	// Reference the Firestore database
  const db = firebase.firestore()

	// Email do usuario logado
	const usuarioEmail = useSelector(state => state.usuarioEmail);

	// Lista de produtos do BD
	const [produtos, setProdutos] = useState([]);

	// Campos de cada produto
	const [id, setId] = useState();
	const [nome, setNome] = useState();
	const [descricao, setDescricao] = useState();
	const [preco, setPreco] = useState();
	const [quantidade, setQuantidade] = useState();
	const [estoque, setEstoque] = useState();

	// Create refs for Produto form
	const refSelectProduct = useRef()
	const refInputQuantidade = useRef()

	// Carrinho (lista de itens)
	const [carrinho, setCarrinho] = useState([])

	/* Venda (mesma estrutura da collection 'venda' dentro do BD)
		data: timestamp
		itens: [
			{ 1x Hamburguer },
			{ ... }
		],
		total: 1200.00
	*/
	const [venda, setVenda] = useState({
		data: undefined,
		itens: [],
		total: undefined
	})

	const handleChange = () => {}

	const addItemAoCarrinho = () => {
		// Recuperar os campos do form de add um item no carrinho
		let itemCarrinho = {
			idItem: Math.random(),
			idProduto: id,
			nome: nome,
			descricao: descricao,
			preco: preco,
			quantidade: quantidade
		}
		
		// Adicionar no state de 'carrinho' para todo o App ter acesso aos items do carrinho
		let listaCarrinho = [...carrinho, itemCarrinho]
		setCarrinho(listaCarrinho)
	}

	const deleteItemCarrinho = (id) => {
		let carrinhoAtualizado = carrinho.filter(item => {
			return item.idItem !== id
		})

		setCarrinho(carrinhoAtualizado)
	}

	// Adicionar item ao carrinho pelo form
	const handleSubmit = e => {
		e.preventDefault()

		addItemAoCarrinho()

		// Limpar campos do form
		refSelectProduct.current.options[0].selected = true
		setId('')
		setNome('')
		setDescricao('')
		setPreco('');
		setEstoque('');
		refInputQuantidade.current.value = ''
		refSelectProduct.current.focus()
	}

	// Add campos de venda e add carrinho dentro de venda
	const cadastrarVenda = () => {
		let valorTotal = 0

		carrinho.forEach(item => {
			valorTotal += (item.preco * item.quantidade)
		})

		const novaVenda = {
			data: new Date(),
			itens: carrinho,
			total: valorTotal
		}

		setVenda(novaVenda)

		return novaVenda
	}

	// Enviar a compra para o BD
	const handleFinalizarCompra = () => {
		const novaVenda = cadastrarVenda()

		db.collection('vendas').add({novaVenda})
			.then(res => {
				console.log('venda adicionada');
			})
			.catch(err => {
				console.log('erro > venda nao adicionada');
			})
		
		setCarrinho([])
	}
	
	useEffect(() => {
		let listaProdutos = [];

		db.collection('posts').where('user', '==', usuarioEmail).get()
			.then(res => {
				res.docs.forEach(doc => {
					listaProdutos.push({
						id: doc.id,
						...doc.data()
					})
				})

				setProdutos(listaProdutos);
			})
			.catch(err => console.log('Erro ao carregar lista de produtos'))		
		
	}, [db, usuarioEmail]);

	return (
		<>
			<Navbar />
			<div className="Home container-fluid h-100">
				<div className="row g-4 h-100">
					{/* PANEL LEFT, for Adding Products and Listing them */}
					<div className="col-md-8 pt-3">
						<h1 className="h3 mb-3">Painel</h1>

						{/* Secao para adicionar uma novo item (produto) no carrinho */}
						<section className="mb-4 p-3 bg-light card">
							<form className="row g-2 align-items-end" onSubmit={handleSubmit}>
								{/* Product field */}
								<div className="col-4">
									<label htmlFor="selectProduct" className="form-label">Produto</label>
									<select id="selectProduct" ref={refSelectProduct} className="form-select" onChange={(e) => {

										setId(produtos[e.target.value].id)
										setNome(produtos[e.target.value].nome)
										setDescricao(produtos[e.target.value].descricao)
										setPreco(produtos[e.target.value].preco);
										setEstoque(produtos[e.target.value].estoque);

									}} required >
										<option value="">Pesquisar</option>
										{
											produtos.map ((value,index) => 
												(<option key={index} value={index}>{value.nome}</option>)
											)
										}
									</select>
								</div>

								{/* Estoque field */}
								<div className="col-2">
									<label htmlFor="inputEstoque" className="form-label">Estoque</label>
									<input type="number" className="form-control" id="inputEstoque" defaultValue={estoque} readOnly />
								</div>
								{/* Price field */}
								<div className="col-2">
									<label htmlFor="inputPrice" className="form-label">Preço</label>
									<input type="number" className="form-control" id="inputPrice" defaultValue={preco} readOnly />
								</div>
								{/* Quantity field */}
								<div className="col-2">
									<label htmlFor="inputQuantity" className="form-label">Quantidade</label>
									<input type="number" className="form-control" id="inputQuantity" ref={refInputQuantidade} onChange={e => {setQuantidade(e.target.valueAsNumber)}} min="1" max={estoque} required />
								</div>
								{/* Submti button */}
								<div className="col-2">
									<button type="submit" className="btn btn-primary w-100">Adicionar</button>
								</div>
							</form>
						</section>

						{/* Section for Listing products from Estoque */}
						<section className="p-3 bg-light card">
							<header className="mb-3 d-flex justify-content-between align-items-center">
								<h3 className="h5">Lista de Produtos</h3>
								<Link to="/produto" className="btn btn-outline-primary">
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
										<path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
									</svg>
									Cadastrar
								</Link>
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
									{
										produtos.length ? (
											produtos.map(produto => {
												return (
													<tr key={produto.id}>
														<th scope="row">{produto.nome}</th>
														<td>{produto.descricao}</td>
														<td>{produto.estoque}</td>
														<td>{produto.preco}</td>
													</tr>
												)
											})
										) : (
											<tr>
												<th scope="row" colSpan="4">Ainda nada por aqui.</th>
											</tr>
										)
									}
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
								<button className="btn btn-primary" onClick={handleFinalizarCompra}>Finalizar Compra</button>
							</div>

							{/* Shopping List of cards */}
							<div className="d-flex flex-column">
								<CartItems carrinho={carrinho} deleteItemCarrinho={deleteItemCarrinho} />
							</div>
						</section>
					</div>
				</div>
			</div>
		</>
	);
}

export default Home;