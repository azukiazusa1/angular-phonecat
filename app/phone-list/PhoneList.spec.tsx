import React from 'react';
import { render, screen, waitFor } from '../test-utils';
import userEvent from '@testing-library/user-event';
import PhoneList from './PhoneList';

describe('PhoneList', () => {
  it('should render phone items', async () => {
    render(<PhoneList />);

    const phoneList = await screen.findAllByRole('listitem');
    expect(phoneList).toHaveLength(20);
    expect(phoneList[0]).toHaveTextContent('Motorola XOOM™ with Wi-Fi');
  });

  it('should filter phone items', async () => {
    render(<PhoneList />);

    const input = screen.getByRole('textbox');
    userEvent.type(input, 'motorola');
    await waitFor(() => {
      expect(screen.getAllByRole('listitem')).toHaveLength(8);
    });
  });

  it('should sort phone items', async () => {
    render(<PhoneList />);

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
