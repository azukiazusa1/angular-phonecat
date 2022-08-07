'use strict';
import template from './phone-detail.template.html';

// Register `phoneDetail` component, along with its associated controller and template
angular.module('phoneDetail').component('phoneDetail', {
  template,
  controller: [
    '$timeout',
    '$routeParams',
    'Phone',
    function PhoneDetailController($timeout, $routeParams, Phone) {
      var self = this;
      self.phone = Phone.get({ phoneId: $routeParams.phoneId }, function (phone) {
        self.mainImageUrl = phone.images[0];
      });

      self.setImage = function setImage(imageUrl) {
        $timeout(function () {
          self.mainImageUrl = imageUrl;
        });
      };
    }
  ]
});
