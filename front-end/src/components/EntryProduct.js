import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EntryProduct.css'

const EntryProduct = () => {
  const history = useNavigate();
  const [formData, setFormData] = useState({
    code: '',
    locale: '',
    unit_entry: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleConfirm = async () => {
    try {
      const response = await axios.put('http://localhost:8080/estoque/atualizacao', formData);
      console.log('Resposta da API:', response.data);
      history('/'); // Redireciona de volta para a tela inicial após a confirmação
    } catch (error) {
      console.error('Erro ao atualizar estoque:', error);
      // Trate o erro aqui, se necessário. Por exemplo, exibindo uma mensagem de erro ao usuário.
    }
  };

  const handleCancel = () => {
    history('/'); // Redireciona de volta para a tela inicial após o cancelamento
  };

  return (
    <div>
      <h3>Entrada de Produto</h3>
      <form>
        <div className="rowContainer">
          <div className="formField">
            <label>Código:</label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
            />
          </div>
          <div className="formField">
            <label>Localização:</label>
            <input
              type="text"
              name="locale"
              value={formData.locale}
              onChange={handleChange}
            />
          </div>
          <div className="formField">
            <label>Quantidade:</label>
            <input
              type="text"
              name="unit_exit"
              value={formData.unit_exit}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="rowContainer">
          <button type="button" onClick={handleConfirm}>Confirmar</button>
          <button type="button" onClick={handleCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default EntryProduct;
