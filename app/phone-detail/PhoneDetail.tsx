import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PhoneImages from './PhoneImags';
import Specifiction from './Specifiction';
import { PhoneDetail } from './types';
import usePhone from './usePhone';

const PhoneDetail: React.FC = () => {
  const { phoneId } = useParams<{ phoneId: string }>();

  const [mainImageUrl, setMainImageUrl] = useState('');
  const { phone } = usePhone({
    phoneId
  });

  useEffect(() => {
    if (phone) {
      setMainImageUrl(phone.images[0]);
    }
  }, [phone]);

  if (!phone || !mainImageUrl) {
    return null;
  }

  return (
    <>
      <PhoneImages phone={phone} mainImageUrl={mainImageUrl} setImage={setMainImageUrl} />

      <Specifiction phone={phone} />
    </>
  );
};

export default PhoneDetail;
