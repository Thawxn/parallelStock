import React, { useState } from 'react';
import axios from 'axios';
import './AddProduct.css';

const AddProduct = ({ onAdd }) => {
  const [productData, setProductData] = useState({
    code: '',
    title: '',
    date: '',
    unit: '',
    type_product: '',
    locale: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/estoque/registro', productData)
  .then((response) => {
    console.log('Resposta da API:', response.data);
    onAdd();
  })
  .catch((error) => {
    console.error('Erro ao adicionar produto:', error);
    // Trate o erro aqui, se necessário. Por exemplo, exibindo uma mensagem de erro ao usuário.
  });

    console.log('Dados do produto:', productData);
    // Limpando o formulário após a submissão:
    setProductData({
      code: '',
      title: '',
      date: '',
      unit: '',
      type_product: '',
      locale: ''
    });
  };

  return (
    <div>
      <h3>Adicionar Produto</h3>
      <form onSubmit={handleSubmit} className="addProductForm">
        <div className="formRow">
          <div className="formField">
            <label>Código:</label>
            <input
              type="text"
              name="code"
              value={productData.code}
              onChange={handleChange}
            />
          </div>
          <div className="formField">
            <label>Título:</label>
            <input
              type="text"
              name="title"
              value={productData.title}
              onChange={handleChange}
            />
          </div>
          <div className="formField">
            <label>Data:</label>
            <input
              type="text"
              name="date"
              value={productData.date}
              onChange={handleChange}
            />
          </div>
          <div className="formField">
            <label>Unidade:</label>
            <input
              type="number"
              name="unit"
              value={productData.unit}
              onChange={handleChange}
            />
          </div>
          <div className="formField">
            <label>Tipo de Produto:</label>
            <input
              type="text"
              name="type_product"
              value={productData.type_product}
              onChange={handleChange}
            />
          </div>
          <div className="formField">
            <label>Localização:</label>
            <input
              type="text"
              name="locale"
              value={productData.locale}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="submitButtonContainer">
          <button type="submit">Adicionar Produto</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
