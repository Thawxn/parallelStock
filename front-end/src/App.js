import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductManagement from './components/ProductManagement';
import EditProduct from './components/EditProduct.js';
import ConfirmDelete from './components/ConfirmDelete';
import AddProduct from './components/AddProduct';
import EntryProduct from './components/EntryProduct';
import ExitProduct from './components/ExitProduct';

function App() {
  return (
    <BrowserRouter>
      <h1>ParallelStock</h1>
      <Routes>
        <Route path="/" element={<ProductManagement />} />
        <Route exact path="/editar/:id" element={<EditProduct />} />
        <Route exact path="/deletar/:id" element={<ConfirmDelete />} />
        <Route exact path="/adicionar" element={<AddProduct />} />
        <Route exact path="/entrada" element={<EntryProduct />} />
        <Route exact path="/saida" element={<ExitProduct />} />
      </Routes>
  </BrowserRouter>
  );
}

export default App;
