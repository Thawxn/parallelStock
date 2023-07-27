import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/estoque');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    }
  };

  return (
    <div>
      <h3>Lista de Produtos</h3>
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
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.code}</td>
              <td>{product.title}</td>
              <td>{product.date}</td>
              <td>{product.unit}</td>
              <td>{product.type_product}</td>
              <td>{product.locale}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
