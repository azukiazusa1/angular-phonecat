import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import angular from 'angular';
import 'angular-resource';
import 'angular-mocks';
import '../phone-list/phone-list.module';
import '../core/phone/phone.module';
import PhoneList from './PhoneList';
import phones from '../phones/phones.json';
import { Phone } from './types';

describe('PhoneList', () => {
  let Phone: ng.resource.IResourceClass<Phone>;
  let $httpBackend: ng.IHttpBackendService;

  beforeEach(() => {
    angular.mock.module('phoneList');
    angular.mock.inject(($resource, _$httpBackend_) => {
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
      $httpBackend.expectGET('phones/phones.json').respond(phones);
    });
  });

  it('should render phone items', async () => {
    render(<PhoneList Phone={Phone} />);

    act(() => {
      $httpBackend.flush();
    });
    const phoneList = await screen.findAllByRole('listitem');
    expect(phoneList).toHaveLength(20);
    expect(phoneList[0]).toHaveTextContent('Motorola XOOM™ with Wi-Fi');
  });

  it('should filter phone items', async () => {
    render(<PhoneList Phone={Phone} />);

    act(() => {
      $httpBackend.flush();
    });
    const input = screen.getByRole('textbox');
    userEvent.type(input, 'motorola');
    await waitFor(() => {
      expect(screen.getAllByRole('listitem')).toHaveLength(8);
    });
  });

  it('should sort phone items', async () => {
    render(<PhoneList Phone={Phone} />);

    act(() => {
      $httpBackend.flush();
    });
    expect((await screen.findAllByRole('listitem'))[0]).toHaveTextContent(
      'Motorola XOOM™ with Wi-Fi'
    );

    const select = screen.getByRole('combobox');
    userEvent.selectOptions(select, 'name');
    await waitFor(() => {
      expect(screen.getAllByRole('listitem')[0]).toHaveTextContent('DROID™ 2 Global by Motorola');
    });
  });
});
