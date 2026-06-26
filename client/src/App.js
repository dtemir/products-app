import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import { getProducts } from './services/productService';

function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Container maxWidth="xs" style={{ marginTop: '40px' }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Products
      </Typography>

      {error && (
        <Typography color="error" align="center" style={{ marginBottom: '10px' }}>
          {error}
        </Typography>
      )}

      <ProductForm onSuccess={fetchProducts} />
      
      <ProductList products={products} />
    </Container>
  );
}

export default App;
