import { Client } from 'pg';
import {
  getProductsListQuery,
  getProductsByIdQuery,
  createProductQuery,
  createStockQuery,
} from '../queries/index';
import { ProductItem } from './types/ProductItem';
class ProductsListService {
  constructor(private pgClient: Client) {
    this.pgClient.connect();
  }

  async getProductsList() {
    const result = await this.pgClient.query(getProductsListQuery);
    return result.rows ?? 'SQL Query Error, getProductsList method';
  }

  async getProductsById(id: string) {
    const result = await this.pgClient.query(getProductsByIdQuery, [id]);
    return result.rows ?? 'SQL Query Error, getProductsById method';
  }

  async createProduct(product: ProductItem) {
    const newProduct = await this.pgClient.query(createProductQuery, [
      product.title,
      product.description,
      product.price,
    ]);

    await this.pgClient.query(createStockQuery, [
      newProduct?.rows[0]?.id,
      newProduct?.rows[0]?.count || 1,
    ]);
    return newProduct;
  }
}

export { ProductsListService };
