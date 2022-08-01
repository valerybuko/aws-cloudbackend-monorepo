import csvParser from 'csv-parser';

export const s3Parser = async (data) => {
  return new Promise((resolve, reject) => {
    console.log('streaming file');
    const parsedData = [];
    data
      .pipe(csvParser())
      .on('data', (chunk) => {
        console.log('chunk from s3Parser', chunk);
        parsedData.push(chunk);
      })
      .on('error', (error) => {
        console.log('s3Parser error', error);
        reject(error);
      })
      .on('end', () => resolve(JSON.stringify(parsedData, null, 2)));
  });
};
