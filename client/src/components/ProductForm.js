import React, { useState } from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';
import { createProduct } from '../services/productService';

function ProductForm({ onSuccess }) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      setError('');
      setLoading(true);
      await createProduct(name);
      setName('');
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4, mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Create Product
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <TextField
          label="Product Name"
          variant="outlined"
          size="small"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          fullWidth
          disabled={loading}
        />
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? 'Adding...' : 'Add'}
        </Button>
      </Box>
      {error && (
        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
}

export default ProductForm;
