import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import firebase from '../../config/firebase';
import Navbar from '../../components/navbar';
import Spinner from 'react-bootstrap/Spinner';

function Produto({ match }) {
	const [mensagem, setMensagem] = useState();
	const [nome, setNome] = useState();
	const [preco, setPreco] = useState();
	const [estoque, setEstoque] = useState();
	const [descricao, setDescricao] = useState();
	const usuarioEmail = useSelector(state => state.usuarioEmail);
	const [carregando, setCarregando] = useState(0);

	const db = firebase.firestore();

	useEffect(() => {
		if (match.params.idProduto) {
			firebase.firestore().collection('produtos').doc(match.params.idProduto).get().then(resultado => {
				setNome(resultado.data().nome);
				setPreco(resultado.data().preco);
				setEstoque(resultado.data().estoque);
				setDescricao(resultado.data().descricao);
			})
		}
	}, [carregando, match.params.idProduto])

	function atualizar() {
		setCarregando(1)
		setMensagem(null);

		db.collection('produtos').doc(match.params.idProduto).update({
			nome: nome,
			preco: preco,
			estoque: estoque,
			descricao: descricao,
		}).then(() => {
			setMensagem('ok');
			setCarregando(0);
		}).catch(erro => {
			setMensagem('erro');
			setCarregando(0);
		})
	}

	function postar() {
		setCarregando(1)

		db.collection('produtos').add({
			nome: nome,
			preco: preco,
			estoque: estoque,
			descricao: descricao,
			criacao: new Date(),
			user: usuarioEmail,
		}).then(() => {
			setMensagem('ok');
			setCarregando(0);
		}).catch(() => {
			setMensagem('erro');
			setCarregando(0);
		})
	};

	return (
		<>
			<Navbar />
			<div className='Produto cadastrar container'>
				<div className="text-center mt-5 mb-4">
					<h3 className="mx-auto font-weight-bold">{match.params.idProduto ? 'Editar Produto' : 'Cadastrar Produto'}</h3>
				</div>

				<div className="row justify-content-md-center">
					<form className="w-50">
						<div className="form-group">
							<label>Nome do Produto:</label>
							<input onChange={(e) => setNome(e.target.value)} type="text" className="form-control" value={nome} />
						</div>
						<div className="form-group row my-4">
							<div className="col-6">
								<label>Preço:</label>
								<input onChange={(e) => setPreco(e.target.valueAsNumber)} type="number" className="form-control" value={preco} />
							</div>
							<div className="col-6">
								<label>Estoque:</label>
								<input onChange={(e) => setEstoque(e.target.valueAsNumber)} type="number" className="form-control" value={estoque} />
							</div>
						</div>
						<div className="form-group my-4">
							<label>Descrição:</label>
							<textarea onChange={(e) => setDescricao(e.target.value)} className="form-control" rows="5" value={descricao}></textarea>
						</div>

						<div className="text-dark text-center my-4">
							{mensagem === 'ok' && <span>&#9745;  A publicação foi enviada com sucesso!</span>}
							{mensagem === 'erro' && <span><strong>&#9888;  Atenção! </strong> Falha no envio.</span>}
						</div>

						{carregando ? <Spinner animation="border" variant="success" role="status"></Spinner>
							: <button onClick={match.params.idProduto ? atualizar : postar} type="button" className="btn btn-lg btn-block btn-cadastro">{match.params.idProduto ? 'Atualizar' : 'Adicionar'}</button>
						}

					</form>
				</div>
			</div>
		</>
	);
}


export default Produto;