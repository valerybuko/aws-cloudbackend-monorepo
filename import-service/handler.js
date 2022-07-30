const AWS = require('aws-sdk');
const BUCKET = 'import-service-cloudfront';

module.exports = {
  importProductsFile: async function (event) {
    const s3 = new AWS.S3({ region: 'eu-west-1' });
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
  },
};
