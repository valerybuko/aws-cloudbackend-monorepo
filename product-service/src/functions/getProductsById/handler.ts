import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

const getProductsById: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event) => {
  const { pathParameters } = event;
  const productId = pathParameters ? pathParameters?.productId : null;
  const productsList = [
    {
      id: '1',
      title: 'Think and Grow Rich',
      description:
        'Think and Grow Rich: The Landmark Bestseller Now Revised and Updated for the 21st Century (Think and Grow Rich Series)',
      price: 15,
    },
    {
      id: '2',
      title: 'Critical Thinking & Logic Mastery',
      description:
        'Critical Thinking & Logic Mastery - 3 Books In 1: How To Make Smarter Decisions, Conquer Logical Fallacies And Sharpen Your Thinking',
      price: 10,
    },
    {
      id: '3',
      title: 'The Secret Life of Groceries',
      description:
        'The Secret Life of Groceries: The Dark Miracle of the American Supermarket',
      price: 19,
    },
    {
      id: '4',
      title: 'Atomic Habits',
      description:
        'Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones',
      price: 19.8,
    },
    {
      id: '5',
      title: 'The Power of Your Subconscious Mind',
      description:
        'In The Power of Your Subconscious Mind, Dr. Joseph Murphy gives you the tools you will need to unlock the awesome powers of your subconscious mind. ',
      price: 9.99,
    },
    {
      id: '6',
      title: 'The 30-Minute Mediterranean Diet Cookbook',
      description:
        'The 30-Minute Mediterranean Diet Cookbook: 101 Easy, Flavorful Recipes for Lifelong Health',
      price: 7.8,
    },
    {
      id: '7',
      title: 'The Viking Heart',
      description: 'The Viking Heart: How Scandinavians Conquered the World',
      price: 16.5,
    },
    {
      id: '8',
      title: 'The Body Keeps the Score',
      description:
        'The Body Keeps the Score: Brain, Mind, and Body in the Healing of Trauma',
      price: 25,
    },
    {
      id: '9',
      title: 'How the World Really Works',
      description:
        "How the World Really Works: The Science Behind How We Got Here and Where We're Going",
      price: 15.99,
    },
    {
      id: '10',
      title: 'I Can Do Hard Things',
      description: 'I Can Do Hard Things: Mindful Affirmations for Kids',
      price: 17.99,
    },
  ];
  if (!productId) {
    return formatJSONResponse({
      products: [],
      errorMessage: `You should pass productId as a param`,
      detailedMessage: 'The requested URL should be /products/{productId}',
    });
  }

  const products = productsList.filter((product) => product.id === productId);

  const detailedMessage = products.length
    ? `Product has been found`
    : 'Product with this productId not found';

  return formatJSONResponse({
    products: products,
    errorMessage: '',
    detailedMessage: detailedMessage,
  });
};

export const main = middyfy(getProductsById);
