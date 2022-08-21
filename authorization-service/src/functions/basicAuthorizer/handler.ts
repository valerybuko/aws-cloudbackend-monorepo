import { middyfy } from '@libs/lambda';
import { generatePolicy } from '@libs/generate-policy';

import { AUTH_EVENT_TYPE, AUTH_EFFECT, UNAUTHORIZED } from './constant';

const basicAuthorizer = async (event, _, cb) => {
  console.log('basicAuthorizer event', event);
  try {
    const { type, authorizationToken, methodArn } = event;
    console.log('authorizationToken', authorizationToken);

    if (type !== AUTH_EVENT_TYPE.TOKEN) {
      cb(UNAUTHORIZED);
    }

    const encodedCredentials = authorizationToken.split(' ')[1];
    const buff = Buffer.from(encodedCredentials, 'base64');
    const creds = buff.toString('utf-8').split(':');
    const username = creds[0];
    const password = creds[1];

    console.log(`username: ${username} and password ${password}`);

    const storedPassword = process.env[username];
    const isCredentialsValid = !storedPassword || storedPassword != password;
    const effect = isCredentialsValid ? AUTH_EFFECT.DENY : AUTH_EFFECT.ALLOW;

    return generatePolicy(encodedCredentials, methodArn, effect);
  } catch (error) {
    cb(UNAUTHORIZED, error);
  }
};

export const main = middyfy(basicAuthorizer);
