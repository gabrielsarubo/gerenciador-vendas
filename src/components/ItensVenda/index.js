const ItensVenda = ({ itens }) => {  
  const listaVendas = itens.length ? (
    itens.map(item => {
      return (
        <div className="card-box mb-4" key={item.idItem}>
          <div className="top mb-2 d-flex justify-content-between align-items-center">
            <div className="h6 m-0">{item.nome}</div>
            <div className="h6 m-0">{`R$ ${item.preco}`}</div>
          </div>
          <div className="mb-2 text-muted">{item.descricao}</div>
          <div>{`Quantidade: ${item.quantidade}`}</div>
        </div>
      )
    })
  ) : (
    <div className="text-center w-100">Selecione uma venda.</div>
  )

  return (
    listaVendas
  );
}

export default ItensVenda;