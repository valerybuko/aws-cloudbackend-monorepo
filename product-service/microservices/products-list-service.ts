import { Client } from 'pg';
import { getProductsListQuery } from '../queries/index';

class ProductsListService {
  constructor(private pgClient: Client) {
    this.pgClient.connect();
  }

  async getProductsList() {
    const result = await this.pgClient.query(getProductsListQuery);
    return result.rows ?? 'SQL Query Error';
  }
}

export { ProductsListService };
