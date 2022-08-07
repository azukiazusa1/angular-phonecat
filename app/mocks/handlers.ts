import { rest } from 'msw';
import { phoneDetail } from './resolvers/phone';
import { phoneList } from './resolvers/phones';

export const handlers = [
  rest.get('phones/phones.json', phoneList),
  rest.get('phones/:phoneId.json', phoneDetail)
];
