import React from 'react'

import './CustomAlert.css'

function CustomAlert({ variant, isOpen }) {

  const messages = {
    'success': 'Operação realizada com sucesso.',
    'fail': 'Houve uma falha na operação.'
  }
  
	return (
    <div className={`alert alert-${variant || 'info'}`} data-isopen={isOpen}>
      { messages[variant] }
    </div>
	)
}

export default CustomAlert
