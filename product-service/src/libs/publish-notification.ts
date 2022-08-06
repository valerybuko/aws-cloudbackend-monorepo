import { SNS } from 'aws-sdk';

export const publishNotification = () => {
  const sns = new SNS({ region: 'eu-west-1' });

  return new Promise((resolve, reject) => {
    sns.publish(
      {
        Subject: 'New product has been added to database',
        Message: 'Added new products to database',
        TopicArn: 'arn:aws:sns:eu-west-1:960411535315:createProductTopic',
      },
      (err, data) => {
        if (err) {
          console.log('publishNotification Error', err);
          reject(err);
        }
        console.log('MessageID is ' + data.MessageId);
        console.log('Message has been published successfully');
        resolve(data);
      }
    );
  });
};
