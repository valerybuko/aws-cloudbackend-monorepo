import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import { productService } from '../../../db_client';

const getProductsById: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event) => {
  const { pathParameters } = event;
  const productId = pathParameters ? pathParameters?.productId : null;
  const products = await productService.getProductsById(productId);
  return formatJSONResponse({
    products,
  });
};

export const main = middyfy(getProductsById);
