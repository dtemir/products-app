import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

function ProductList({ products }) {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Products List
      </Typography>
      {products.length === 0 ? (
        <Typography color="textSecondary">No products found.</Typography>
      ) : (
        <List>
          {products.map((product) => (
            <ListItem key={product.id} divider>
              <ListItemText
                primary={product.name}
                secondary={`ID: ${product.id}`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
}

export default ProductList;
