import React, { useState } from 'react';
import axios from 'axios';

const ProductSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/estoque/${searchTerm}`);
      setSearchResult(response.data);
    } catch (error) {
      console.error('Error searching for products:', error);
      setSearchResult(null);
    }
  };

  const handleDelete = async (productId) => {
    try {
      // Faça uma requisição para o servidor para excluir o produto com o ID especificado
      await axios.delete(`http://localhost:8080/estoque/delete/${productId}`);
      // Atualize a lista de produtos após a exclusão
      handleSearch();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>
      {searchResult && (
        <div>
          <h3>Resultado da busca:</h3>
          <table>
            <tr>
              <th>Codigo</th>
              <th>Nome</th>
              <th>Data</th>
              <th>Quantidade</th>
              <th>Tipo</th>
              <th>Local</th>
              <th></th>
            </tr>
            {searchResult.map((product) => (
              <tr key={product.code}>
                <td>{product.code}</td>
                <td>{product.title}</td>
                <td>{product.date}</td>
                <td>{product.unit}</td>
                <td>{product.type_product}</td>
                <td>{product.locale}</td>
                <td>
                    <button onClick={() => handleDelete(product.id)}>Excluir</button>
                    {' | '}
                    <button onClick={() => handleDelete(product.id)}>Excluir</button>
                  </td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductSearch;
