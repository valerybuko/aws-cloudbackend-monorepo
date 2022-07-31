const AWS = require('aws-sdk');
const csv = require('csv-parser');
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
  importFileParser: async function (event) {
    const s3 = new AWS.S3({ region: 'eu-west-1' });
    const record = event.Records[0];
    const params = {
      Bucket: BUCKET,
      Key: record.s3.object.key,
    };

    const s3Stream = s3.getObject(params).createReadStream();

    s3Stream
      .pipe(csv())
      .on('data', (data) => {})
      .on('error', (error) => {})
      .on('end', async () => {
        await s3
          .copyObject({
            Bucket: BUCKET,
            CopySource: `${BUCKET}/${record.s3.object.key}`,
            Key: record.s3.object.key.replace('uploaded', 'parsed'),
          })
          .promise();

        await s3
          .deleteObject({
            Bucket: BUCKET,
            Key: record.s3.object.key,
          })
          .promise();
      });
  },
};
