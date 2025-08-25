import App from './App';
import { act, screen, waitFor } from '@testing-library/react';
import { renderUIWithProviders } from './test-utils/renderUIWithProviders';

const LOADING = 'Loading...';

describe('App', () => {
  it('should render a fallback loading... component first', () => {
    renderUIWithProviders(<App />);
    expect(screen.getByText(LOADING)).toBeInTheDocument();
  });

  it('should render the App component', async () => {
    await act(async () => {
      renderUIWithProviders(<App />);
    });

    await waitFor(() => {
      expect(screen.queryByText(LOADING)).not.toBeInTheDocument();
    });
    expect(await screen.findByText(/Garage/i)).toBeVisible();
    expect(await screen.findByText(/Winners/i)).toBeVisible();
  });
});
