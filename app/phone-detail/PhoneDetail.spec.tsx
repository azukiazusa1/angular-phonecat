import React from 'react';
import { render, screen, waitFor, within } from '../test-utils';
import userEvent from '@testing-library/user-event';
import PhoneDetail from './PhoneDetail';

describe('PhoneList', () => {
  it('should fetch the `nexus-s`', async () => {
    render(<PhoneDetail />, undefined, {
      path: '/phones/:phoneId',
      initialEntries: ['/phones/nexus-s']
    });

    expect(await screen.findByRole('heading')).toHaveTextContent('Nexus S');
  });

  it('should display the first phone image as the main phone image', async () => {
    render(<PhoneDetail />, undefined, {
      path: '/phones/:phoneId',
      initialEntries: ['/phones/nexus-s']
    });

    expect(await screen.findByTestId('main-image')).toHaveAttribute(
      'src',
      'img/phones/nexus-s.0.jpg'
    );
  });

  it('should swap main image if a thumbnail is clicked', async () => {
    render(<PhoneDetail />, undefined, {
      path: '/phones/:phoneId',
      initialEntries: ['/phones/nexus-s']
    });

    const thumbnails = await screen.findAllByRole('listitem');
    userEvent.click(within(thumbnails[2]).getByRole('img'));

    waitFor(() =>
      expect(screen.getByTestId('main-image')).toHaveAttribute('src', 'img/phones/nexus-s.2.jpg')
    );
  });
});
