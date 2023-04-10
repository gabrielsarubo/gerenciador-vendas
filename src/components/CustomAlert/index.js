import React from 'react'

import './CustomAlert.css'

function CustomAlert({refAlertElement, success}) {
	return (
    <div
      className={`alert ${success ? `alert-success` : `alert-danger`}`}
      role="alert"
      ref={refAlertElement}
      data-success={success}
    >
      {success
        ? "O registro da venda foi removido com sucesso."
        : "Houve uma falha ao remover o registro da venda"
      }
    </div>
	)
}

export default CustomAlert
