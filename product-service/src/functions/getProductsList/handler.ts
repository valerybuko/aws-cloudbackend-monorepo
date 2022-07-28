import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import { productService } from '../../../db_client';

const getProductsList: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event) => {
  const products = await productService.getProductsList();
  return formatJSONResponse({
    products,
  });
};

export const main = middyfy(getProductsList);
