import React from 'react';
import { act, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import angular from 'angular';
import 'angular-resource';
import 'angular-route';
import 'angular-mocks';
import './phone-detail.module';
import '../core/phone/phone.module';
import PhoneDetail from './PhoneDetail';
import nexusS from '../phones/nexus-s.json';
import { PhoneDetail as PhoneDetailType } from './types';

describe('PhoneList', () => {
  let Phone: ng.resource.IResourceClass<PhoneDetailType>;
  let $httpBackend: ng.IHttpBackendService;
  let $routeParams: ng.route.IRouteParamsService;

  beforeEach(() => {
    angular.mock.module('phoneDetail');
    angular.mock.inject(($resource, _$httpBackend_, _$routeParams_) => {
      Phone = $resource(
        'phones/:phoneId.json',
        {},
        {
          query: {
            method: 'GET',
            params: { phoneId: 'phones' },
            isArray: true
          }
        }
      );

      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('phones/nexus-s.json').respond(nexusS);

      $routeParams = _$routeParams_;
      $routeParams.phoneId = 'nexus-s';
    });
  });

  it('should fetch the `nexus-s`', async () => {
    render(<PhoneDetail Phone={Phone} $routeParams={$routeParams} />);

    act(() => {
      $httpBackend.flush();
    });

    expect(screen.getByRole('heading')).toHaveTextContent('Nexus S');
  });

  it('should display the first phone image as the main phone image', async () => {
    render(<PhoneDetail Phone={Phone} $routeParams={$routeParams} />);

    act(() => {
      $httpBackend.flush();
    });

    expect(screen.getByTestId('main-image')).toHaveAttribute('src', 'img/phones/nexus-s.0.jpg');
  });

  it('should swap main image if a thumbnail is clicked', () => {
    render(<PhoneDetail Phone={Phone} $routeParams={$routeParams} />);

    act(() => {
      $httpBackend.flush();
    });

    const thumbnails = screen.getAllByRole('listitem');
    userEvent.click(within(thumbnails[2]).getByRole('img'));

    waitFor(() =>
      expect(screen.getByTestId('main-image')).toHaveAttribute('src', 'img/phones/nexus-s.2.jpg')
    );
  });
});
