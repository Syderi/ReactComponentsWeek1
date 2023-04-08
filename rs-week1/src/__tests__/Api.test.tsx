import { vi } from 'vitest';
import { getProducts, getProductDetails } from '../components/pages/Api/Api';

describe('getProducts and getProductDetails functions', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  test('getProducts returns an array of products', async () => {
    const data = {
      products: [{ id: 1, title: 'Product 1', price: 10 }],
    };

    global.fetch = vi.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => data,
      })
    );
    const products = await getProducts('search query');
    expect(Array.isArray(products)).toBe(true);
    expect(products[0]).toHaveProperty('id');
    expect(products[0]).toHaveProperty('title');
    expect(products[0]).toHaveProperty('price');
  });

  test('getProductDetails returns a product object', async () => {
    const mockProduct = { id: 1, title: 'Product 1', price: 10 };
    const mockResponseProduct = Promise.resolve(mockProduct);
    const mockFetchPromiseProduct = Promise.resolve({
      json: () => mockResponseProduct,
    });
    global.fetch = vi.fn().mockImplementation(() => mockFetchPromiseProduct);

    const product = await getProductDetails(1);
    expect(typeof product).toBe('object');
    expect(product).toHaveProperty('id');
    expect(product).toHaveProperty('title');
    expect(product).toHaveProperty('price');
  });
});
