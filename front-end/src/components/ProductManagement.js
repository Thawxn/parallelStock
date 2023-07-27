import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ProductManagement.css';
import AddProduct from './AddProduct';

const ProductManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/estoque');
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
      setFilteredProducts([]);
    }
  };

  const handleSearch = (searchTerm) => {
    console.log('sim');
    setSearchTerm(searchTerm); // Atualize o estado do termo de pesquisa
    const filtered = products.filter((product) =>
      product.code.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered); // Atualize o estado dos produtos filtrados
  };

  const SearchIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
    >
      <path d="M16.5 14h-.79l-.28-.27A6.51 6.51 0 0 0 15 10.5 6.5 6.5 0 0 0 8.5 4 6.5 6.5 0 0 0 2 10.5 6.5 6.5 0 0 0 8.5 17c1.74 0 3.41-.68 4.64-1.93l.27-.28v.79l4.25 4.25 1.25-1.25-4.25-4.25zm-8 0a4.5 4.5 0 1 1 4.5-4.5 4.5 4.5 0 0 1-4.5 4.5z" />
    </svg>
  );

  return (
    <div>
      <div className="searchBar">
        <SearchIcon />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
        <h3>Lista de Produtos</h3>
        <div className="tableWrapper">
        <table>
          <thead>
            <tr>
              <th>Codigo</th>
              <th>Nome</th>
              <th>Data</th>
              <th>Quantidade</th>
              <th>Tipo</th>
              <th>Local</th>
              <th> editar | excluir </th>
            </tr>
          </thead>
          </table>
          <div className="tableBody">
          <table>
          <tbody className="productTableBody">
            {(filteredProducts.length > 0 ? filteredProducts : products).map((product) => (
              <tr key={product.id}>
                <td>{product.code}</td>
                <td>{product.title}</td>
                <td>{product.date}</td>
                <td>{product.unit}</td>
                <td>{product.type_product}</td>
                <td>{product.locale}</td>
                <td>
                  <Link to={`/editar/${product.code}`}>
                    <button>Editar</button>
                  </Link>
                    {' | '}
                  <Link to={`/deletar/${product.code}`}>
                    <button>Excluir</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        </div>
      <AddProduct onAdd={fetchProducts} />
    </div>
  );
};

export default ProductManagement;
