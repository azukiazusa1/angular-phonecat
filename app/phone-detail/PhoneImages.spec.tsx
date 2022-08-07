import React from 'react';
import { render, screen, within } from '@testing-library/react';
import 'angular';
import './phone-detail.module';
import PhoneImages from './PhoneImags';
import nexusS from '../phones/nexus-s.json';
import userEvent from '@testing-library/user-event';

describe('PhoneImages', () => {
  it('should display the `mainImageUrl` props as the main phone image', () => {
    const setImage = jest.fn();
    render(
      <PhoneImages phone={nexusS} mainImageUrl="img/phones/nexus-s.0.jpg" setImage={setImage} />
    );

    expect(screen.getByTestId('main-image')).toHaveAttribute('src', 'img/phones/nexus-s.0.jpg');
  });

  it('should call `setImage` when an image is clicked', () => {
    const setImage = jest.fn();
    render(
      <PhoneImages phone={nexusS} mainImageUrl="img/phones/nexus-s.1.jpg" setImage={setImage} />
    );

    const thumbnails = screen.getAllByRole('listitem');
    userEvent.click(within(thumbnails[1]).getByRole('img'));

    expect(setImage).toHaveBeenCalledWith('img/phones/nexus-s.1.jpg');
  });
});
