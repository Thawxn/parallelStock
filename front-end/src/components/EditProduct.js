import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './EditProduct.css';

const EditProduct = () => {
  const history = useNavigate();
  const {id} = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async (id) => {
      try {
        const response = await axios.get(`http://localhost:8080/estoque/${id}`);
        const { code, title, date, unit, type_product, locale } = response.data[0]
        setProduct({ code, title, date, unit, type_product, locale });
      } catch (error) {
        console.error('Error searching for products:', error);
        setProduct(null);
      }
    };

    fetchProductDetails(id);
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const updateProduct = async () => {
    try {
      await axios.put(`http://localhost:8080/estoque/edit/${id}`, product);
      console.log('Produto atualizado com sucesso!');
      history('/');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateProduct();
  };

  return (
    <div>
      {product ? (
        <>
        <h2>Editando o produto {product.title}</h2>
        <form onSubmit={handleSubmit}>
          <label>
          Código:
          <input
            type="text"
            name="code"
            value={product.code}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Nome:
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Data:
          <input
            type="text"
            name="date"
            value={product.date}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Quantidade:
          <input
            type="text"
            name="unit"
            value={product.unit}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Tipo:
          <input
            type="text"
            name="type_product"
            value={product.type_product}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Local:
          <input
            type="text"
            name="locale"
            value={product.locale}
            onChange={handleInputChange}
          />
        </label>
        <div className="buttons-container">
          <button type="submit">Salvar</button>
          <Link to={`/`}>
            <button>Cancelar</button>
          </Link>
        </div>
      </form>
      </>
      ) : (
      <p>carregando...</p>
      )}
    </div>
  );
};

export default EditProduct;
