import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { publishNotification } from '@libs/publish-notification';
import { productService } from '../../../db_client';

const catalogBatchProcess = async (event) => {
  try {
    await event.Records.forEach(async (message) => {
      const product = JSON.parse(message.body);
      await productService.createProduct(product);
    });
    await publishNotification();
    return formatJSONResponse({ result: 'Product has been added to database' });
  } catch (err) {
    console.log('catalogBatchProcess Error', err);
  }
};

export const main = middyfy(catalogBatchProcess);
