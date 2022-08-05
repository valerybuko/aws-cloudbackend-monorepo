import {
  S3Client,
  GetObjectCommand,
  CopyObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';

import { formatJSONResponse } from '@libs/api-gateway';
import { s3Parser } from '@libs/s3-parser';

const importFileParser = async (event) => {
  const record = event.Records[0];
  console.log('event record', record);

  const {
    awsRegion,
    s3: { bucket, object: s3Object },
  } = record;

  const s3Bucket = new S3Client({ region: awsRegion });

  const params = {
    Bucket: bucket.name,
    Key: s3Object.key,
  };

  try {
    const command = new GetObjectCommand(params);
    const streamData = await s3Bucket.send(command);
    const parsedData = await s3Parser(streamData.Body);
    console.log('parsedData', parsedData);

    await s3Bucket.send(
      new CopyObjectCommand({
        Bucket: bucket.name,
        CopySource: `${bucket.name}/${s3Object.key}`,
        Key: s3Object.key.replace('uploaded', 'parsed'),
      })
    );
    console.log(`${s3Object.key} file copied from uploaded to parsed folder`);

    await s3Bucket.send(
      new DeleteObjectCommand({
        Bucket: bucket.name,
        Key: s3Object.key,
      })
    );
    console.log(`${s3Object.key} file removed from uploaded`);

    return formatJSONResponse({
      result: `${s3Object.key} file successfully parsed`,
    });
  } catch (error) {
    console.log(error);
  }
};

export const main = importFileParser;
