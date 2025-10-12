export async function fetchProducts() {
  const response = await fetch('/products.json');
  if (!response.ok) throw new Error('Failed to load products');
  return response.json();
}

export async function fetchProductById(productId) {
  const products = await fetchProducts();
  return products.find(p => p.id === productId) || null;
}

