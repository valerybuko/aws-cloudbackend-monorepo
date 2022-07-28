import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import { productService } from '../../../db_client';

const getProductsById: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event) => {
  const product = await productService.createProduct(event.body);

  return formatJSONResponse({
    product,
  });
};

export const main = middyfy(getProductsById);
