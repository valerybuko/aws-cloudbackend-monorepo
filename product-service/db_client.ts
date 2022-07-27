import { Client, ClientConfig } from 'pg';

import { ProductsListService } from './microservices/products-list-service';

const { DB_HOST, DB_PORT, DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;

const dbOptions: ClientConfig = {
  host: DB_HOST,
  port: Number(DB_PORT),
  database: DB_NAME,
  user: DB_USERNAME,
  password: DB_PASSWORD,
  ssl: {
    rejectUnauthorized: false,
  },
  connectionTimeoutMillis: 5000,
};

const dbClient = new Client(dbOptions);
dbClient.connect();

export const productService = new ProductsListService(dbClient);
