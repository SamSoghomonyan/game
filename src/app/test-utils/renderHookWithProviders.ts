import { RenderOptions, renderHook } from '@testing-library/react';
import Providers from '../providers/Providers';

export function renderHookWithProviders(hook: () => {}, options?: Omit<RenderOptions, 'wrapper'>) {
  return renderHook(hook, { wrapper: Providers, ...options });
}
