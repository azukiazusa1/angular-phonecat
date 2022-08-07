import useSWR from 'swr';
import { fetcher } from '../core/fetcher';
import { PhoneDetail } from './types';

const getPhoneById = async (url: string) => {
  return await fetcher<PhoneDetail>(url);
};

type UsePhonesReturn = {
  phone: PhoneDetail | undefined;
  isLoading: boolean;
  error: Error | undefined;
};

type UsePhoneParams = {
  phoneId: string;
};

const usePhone = ({ phoneId }: UsePhoneParams): UsePhonesReturn => {
  const { data, error } = useSWR<PhoneDetail>(`phones/${phoneId}.json`, getPhoneById);

  return {
    phone: data,
    isLoading: !error && !data,
    error
  };
};

export default usePhone;
