import { Client } from 'pg';
import { getProductsListQuery, getProductsByIdQuery } from '../queries/index';

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
}

export { ProductsListService };
