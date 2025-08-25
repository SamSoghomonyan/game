import React from 'react';
import { RenderOptions, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

export const renderUIWithMemoryRouter = (
  ui: React.ReactNode,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return <MemoryRouter {...options}>{children}</MemoryRouter>;
  };
  return render(ui, { wrapper: Wrapper });
};
