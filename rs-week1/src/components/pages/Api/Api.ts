import { IProduct } from '../../types/interface';

async function getProducts(search: string): Promise<IProduct[]> {
  const res = await fetch(`https://dummyjson.com/products/search?q=${search}`);
  const data = await res.json();
  return data.products;
}

async function getProductDetails(productId: number): Promise<IProduct> {
  const res = await fetch(`https://dummyjson.com/products/${productId}`);
  const data = await res.json();
  return data;
}

export { getProducts, getProductDetails };
