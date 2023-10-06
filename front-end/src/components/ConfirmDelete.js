import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './ConfirmDelete.css';

const ConfirmDelete = () => {
  const history = useNavigate();
  const {id} = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async (productId) => {
      try {
        const response = await axios.get(`http://localhost:8080/estoque/${productId}`);
        const { id, code, title, date, unit, type_product, locale } = response.data[0]
        setProduct({ id, code, title, date, unit, type_product, locale });
      } catch (error) {
        console.error('Error searching for products:', error);
        setProduct(null);
      }
    };

    fetchProductDetails(id);
  }, [id]);

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/estoque/delete/${product.id}`);
      console.log('Produto excluído com sucesso!');
      history('/');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div>
      {product ? (
    <>
      <h2> Deseja realmente deletar o produto {product.title}? </h2>
        <table>
          <thead>
            <tr>
              <th>Codigo</th>
              <th>Nome</th>
              <th>Data</th>
              <th>Quantidade</th>
              <th>Tipo</th>
              <th>Local</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{product.code}</td>
              <td>{product.title}</td>
              <td>{product.date}</td>
              <td>{product.unit}</td>
              <td>{product.type_product}</td>
              <td>{product.locale}</td>
            </tr>
          </tbody>
        </table>
      <div className="buttons-container">
        <Link to={`/`}>
          <button>Cancelar</button>
        </Link>
        <button onClick={handleConfirmDelete}>Confirmar</button>
      </div>
    </>
      ) : (
      <p>carregando...</p>
      )}
    </div>
  );
};

export default ConfirmDelete;
