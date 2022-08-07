import angular from 'angular';
import React, { useEffect, useState } from 'react';
import { react2angular } from 'react2angular';
import PhoneImages from './PhoneImags';
import Specifiction from './Specifiction';
import { PhoneDetail } from './types';

type Props = {
  Phone: ng.resource.IResourceClass<PhoneDetail>;
  $routeParams: ng.route.IRouteParamsService;
};

const PhoneDetail: React.FC<Props> = ({ Phone, $routeParams }) => {
  const [phone, setPhone] = useState<PhoneDetail | null>(null);
  const [mainImageUrl, setMainImageUrl] = useState('');

  useEffect(() => {
    let igonre = false;
    Phone.get({ phoneId: $routeParams.phoneId }, (result: PhoneDetail) => {
      if (!igonre) {
        setPhone(result);
        setMainImageUrl(result.images[0]);
      }
    });
    return () => {
      igonre = true;
    };
  }, [Phone, setPhone, $routeParams, setMainImageUrl]);

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
  .component('phoneDetail', react2angular(PhoneDetail, [], ['Phone', '$routeParams']));
