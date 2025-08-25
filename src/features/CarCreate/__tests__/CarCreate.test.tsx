import { renderUIWithProviders } from '@/app/test-utils/renderUIWithProviders';
import { CarCreate } from '../ui/CarCreate';
import { screen } from '@testing-library/dom';
import userEvent from "@testing-library/user-event";

describe('CarCreate', () => {
  it('should be rendered', async () => {
    const { container } = renderUIWithProviders(<CarCreate />);
    const form = container.querySelector('form');
    expect(form).toBeInTheDocument();
  });

  it('should handle input change', async () => {
    const value = 'test car'

    renderUIWithProviders(<CarCreate />);
    const input = screen.getByRole('textbox')
    await userEvent.type(input, value)
    
    expect(input).toHaveValue(value)
  })

  it.skip('should make http request on submit', async () => {
    renderUIWithProviders(<CarCreate />);

    await userEvent.type(await screen.findByRole('textbox'), 'Car');
    await userEvent.click(await screen.findByRole('button'));

  });
});
