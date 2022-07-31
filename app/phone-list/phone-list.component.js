'use strict';
import template from './phone-list.template.html';

// Register `phoneList` component, along with its associated controller and template
angular.module('phoneList').component('phoneList', {
  template,
  controller: [
    'Phone',
    function PhoneListController(Phone) {
      this.phones = [];
      Phone.query().$promise.then((phones) => {
        this.phones = phones;
      });
      this.orderProp = 'age';
    }
  ]
});
