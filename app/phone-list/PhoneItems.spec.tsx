import React from 'react';
import { render, screen } from '../test-utils';
import PhoneItems from './PhoneItems';
import phones from '../phones/phones.json';

describe('PhoneItems', () => {
  it('should render phone items', () => {
    render(<PhoneItems phones={phones} orderProp="age" />);

    const phoneList = screen.getAllByRole('listitem');

    expect(phoneList).toHaveLength(20);
    expect(phoneList[0]).toHaveTextContent('Motorola XOOM™ with Wi-Fi');
  });

  it('should render phone items with query', () => {
    render(<PhoneItems phones={phones} query="motorola" orderProp="age" />);

    expect(screen.getAllByRole('listitem')).toHaveLength(8);
  });

  it('should render phone items with query and orderProp', () => {
    render(<PhoneItems phones={phones} query="motorola" orderProp="name" />);

    const phoneList = screen.getAllByRole('listitem');

    expect(phoneList).toHaveLength(8);
    expect(phoneList[0]).toHaveTextContent('DROID™ 2 Global by Motorola');
  });
});
