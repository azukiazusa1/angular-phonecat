import useSWR from 'swr';
import { Phone } from './types';
import { fetcher } from '../core/fetcher';

const getPhones = async (): Promise<Phone[]> => {
  return await fetcher<Phone[]>('phones/phones.json');
};

type UsePhonesReturn = {
  phones: Phone[];
  isLoading: boolean;
  error: Error | undefined;
};

const usePhones = (): UsePhonesReturn => {
  const { data, error } = useSWR<Phone[]>('phones/phones.json', getPhones);
  return {
    phones: data ?? [],
    isLoading: !error && !data,
    error
  };
};

export default usePhones;
