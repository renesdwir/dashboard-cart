export async function fetchProduct() {
  const response = await fetch("https://dummyjson.com/products?skip=0&limit=100");
  return await response.json();
}
export async function fetchCart() {
  const response = await fetch("https://dummyjson.com/carts");
  return await response.json();
}
export async function fetchCartDetail(id: string) {
  const response = await fetch(`https://dummyjson.com/carts/${id}`);
  return await response.json();
}
export async function fetchUser(id: number | undefined) {
  const response = await fetch(`https://dummyjson.com/users/${id}`);
  return await response.json();
}
