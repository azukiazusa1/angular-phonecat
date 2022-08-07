import { rest } from 'msw';
import { phoneList } from './resolvers/phones';

export const handlers = [rest.get('phones/phones.json', phoneList)];
