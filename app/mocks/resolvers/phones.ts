import { ResponseResolver, RestContext, RestRequest } from 'msw';
import phones from '../../phones/phones.json';
import { Phone } from '../../phone-list/types';

export const phoneList: ResponseResolver<RestRequest, RestContext> = (req, res, ctx) => {
  return res(ctx.status(200), ctx.json<Phone[]>(phones));
};
