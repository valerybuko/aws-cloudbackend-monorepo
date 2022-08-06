import { SQS } from 'aws-sdk';

export const sendProductsToQueue = (products) => {
  const sqs = new SQS();
  const productsList = JSON.parse(products);
  console.log('products are sending to queue', productsList);

  productsList.forEach((product) => {
    sqs.sendMessage(
      {
        QueueUrl:
          'https://sqs.eu-west-1.amazonaws.com/960411535315/catalogItemsQueue',
        MessageBody: JSON.stringify(product),
      },
      (err, data) => {
        if (err) {
          console.log('sendProductsToQueue Error: ', err);
        }
        console.log('MessageID is', data.MessageId);
        console.log('Product has been sended to SQS successfully ', product);
      }
    );
  });
};
