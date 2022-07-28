export const getProductsListQuery: string =
  'SELECT id, count, price, title, description FROM products INNER JOIN stocks ON products.id = stocks.product_id;';
