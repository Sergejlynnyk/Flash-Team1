const BASE_URL = 'http://localhost:3000/products';

export async function getAllProducts() {
  const res = await fetch(BASE_URL);
  return await res.json();
}

export async function getProductById(id) {
  const res = await fetch(`${BASE_URL}/${id}`);
  return await res.json();
}