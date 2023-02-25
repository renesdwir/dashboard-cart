export async function fetchProduct() {
  const response = await fetch("https://dummyjson.com/products?skip=0&limit=100");
  return await response.json();
}
