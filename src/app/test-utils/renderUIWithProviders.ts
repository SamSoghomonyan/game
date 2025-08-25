import React from 'react';
import { RenderOptions, render } from '@testing-library/react';
import Providers from '../providers/Providers';

export const renderUIWithProviders = (
  ui: React.ReactNode,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  return render(ui, { wrapper: Providers, ...options });
};
