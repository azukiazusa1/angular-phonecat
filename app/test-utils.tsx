import React, { ReactNode, ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { SWRConfig } from 'swr';

const Wrapper = ({ children }: { children: ReactNode }) => {
  return <SWRConfig value={{ dedupingInterval: 0 }}>{children}</SWRConfig>;
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: Wrapper, ...options });

export * from '@testing-library/react';

export { customRender as render };
