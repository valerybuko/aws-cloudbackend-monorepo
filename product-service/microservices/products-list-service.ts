import { Client, QueryConfig } from 'pg';

class ProductsListService {
  constructor(private pgClient: Client) {}

  async getProductsList() {
    const result = await this.pgClient.query('SELECT * FROM products');
    return result.rows ?? 'SQL Query Error';
  }
}

export { ProductsListService };
