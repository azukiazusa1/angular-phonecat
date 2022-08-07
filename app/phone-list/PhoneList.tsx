import angular from 'angular';
import React, { useState } from 'react';
import { react2angular } from 'react2angular';
import usePhones from './usePhones';
import PhoneItems from './PhoneItems';

const PhoneList: React.FC = () => {
  const { phones } = usePhones();
  const [query, setQuery] = useState('');
  const [orderProp, setOrderProp] = useState<'name' | 'age'>('age');

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <p>
            Search: <input value={query} onChange={(e) => setQuery(e.target.value)} />
          </p>

          <p>
            Sort by:{' '}
            <select
              value={orderProp}
              onChange={(e) => setOrderProp(e.target.value as 'name' | 'age')}>
              <option value="name">Alphabetical</option>
              <option value="age">Newest</option>
            </select>
          </p>
        </div>
        <div className="col-md-10">
          <PhoneItems phones={phones} query={query} orderProp={orderProp} />
        </div>
      </div>
    </div>
  );
};

export default PhoneList;

angular.module('phoneList').component('phoneList', react2angular(PhoneList, []));
