export const getProductsListQuery: string =
  'SELECT id, count, price, title, description FROM products INNER JOIN stocks ON products.id = stocks.product_id;';
export const getProductsByIdQuery: string =
  'select id, count, price, title, description from products inner join stocks on products.id = stocks.product_id and id=$1';

export const createProductQuery: string =
  'insert into products (title, description, price) values ($1, $2, $3)';

export const createStockQuery: string =
  'insert into stocks (product_id, count) values ($1, $2)';
