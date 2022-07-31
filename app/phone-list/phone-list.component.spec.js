import 'angular';
import 'angular-resource';
import 'angular-route';
import 'angular-mocks';

import '../core/phone/phone.module';
import '../core/phone/phone.service';
import './phone-list.module';
import './phone-list.component';

describe('phoneList', function () {
  // Load the module that contains the `phoneList` component before each test
  beforeEach(angular.mock.module('phoneList'));

  // Test the controller
  describe('PhoneListController', function () {
    var $httpBackend, ctrl;

    beforeEach(inject(function ($componentController, _$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $httpBackend
        .expectGET('phones/phones.json')
        .respond([{ name: 'Nexus S' }, { name: 'Motorola DROID' }]);

      ctrl = $componentController('phoneList');
    }));

    it('should create a `phones` property with 2 phones fetched with `$http`', function () {
      expect.extend({
        toEqual: (actual, expected) => {
          return {
            pass: angular.equals(actual, expected),
            message: `Expected ${actual} to equal ${expected}`
          };
        }
      });

      expect(ctrl.phones).toEqual([]);

      $httpBackend.flush();
      expect(ctrl.phones).toEqual([{ name: 'Nexus S' }, { name: 'Motorola DROID' }]);
    });

    it('should set a default value for the `orderProp` property', function () {
      expect(ctrl.orderProp).toBe('age');
    });
  });
});
