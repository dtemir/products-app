const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/products';

export const getProducts = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
};

export const createProduct = async (name) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to create product');
  }
  return data;
};
