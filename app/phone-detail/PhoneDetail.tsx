import angular from 'angular';
import React, { useEffect, useState } from 'react';
import { react2angular } from 'react2angular';
import PhoneImages from './PhoneImags';
import Specifiction from './Specifiction';
import { PhoneDetail } from './types';
import usePhone from './usePhone';

type Props = {
  $routeParams: ng.route.IRouteParamsService;
};

const PhoneDetail: React.FC<Props> = ({ $routeParams }) => {
  const [mainImageUrl, setMainImageUrl] = useState('');
  const { phone } = usePhone({
    phoneId: $routeParams.phoneId
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

angular
  .module('phoneDetail')
  .component('phoneDetail', react2angular(PhoneDetail, [], ['$routeParams']));
