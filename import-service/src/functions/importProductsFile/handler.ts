import * as AWS from 'aws-sdk';

import { middyfy } from '@libs/lambda';

const BUCKET = 'import-service-incloud';
const s3 = new AWS.S3({ region: 'eu-west-1' });

const importProductsFile = async (event) => {
  const catalogName = event.queryStringParameters.name;
  const catalogPath = `uploaded/${catalogName}`;
  const params = {
    Bucket: BUCKET,
    Key: catalogPath,
    Expires: 60,
    ContentType: 'text/csv',
  };
  const uploadedUrl = await s3.getSignedUrlPromise('putObject', params);

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Methods': '*',
    },
    body: uploadedUrl,
  };
};

export const main = middyfy(importProductsFile);
