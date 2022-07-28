export const getProductsListQuery: string =
  'SELECT id, count, price, title, description FROM products INNER JOIN stocks ON products.id = stocks.product_id;';
export const getProductsByIdQuery: string =
  'select id, count, price, title, description from products inner join stocks on products.id = stocks.product_id and id=$1';
