import React, { ReactNode, ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { SWRConfig } from 'swr';
import { MemoryRouter, MemoryRouterProps, Route } from 'react-router-dom';

type RouterOptions = {
  initialEntries?: MemoryRouterProps['initialEntries'];
  path?: string;
};

const Wrapper = ({ initialEntries, path = '/' }: RouterOptions = {}) =>
  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <MemoryRouter initialEntries={initialEntries}>
        <SWRConfig value={{ dedupingInterval: 0 }}>
          <Route path={path}>{children}</Route>
        </SWRConfig>
      </MemoryRouter>
    );
  };

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'> & { routeOptions?: RouterOptions },
  routeOptions?: RouterOptions
) => render(ui, { wrapper: Wrapper(routeOptions), ...options });

export * from '@testing-library/react';

export { customRender as render };
