import { ResponseResolver, RestContext, RestRequest } from 'msw';
import { PhoneDetail } from '../../phone-detail/types';

export const phoneDetail: ResponseResolver<RestRequest, RestContext> = async (req, res, ctx) => {
  const phone = await import(`../../phones/${req.params.phoneId}.json`);
  if (!phone) {
    return res(ctx.status(404));
  }

  return res(ctx.status(200), ctx.json<PhoneDetail>(phone));
};
