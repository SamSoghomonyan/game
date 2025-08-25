import { Button, ButtonKits } from './Button';
import { render, screen, fireEvent, logRoles } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

describe('Button', () => {
  it('should render a button with children', () => {
    const children = <p>Click me</p>;
    const {baseElement} =  render(<Button kit={ButtonKits.CLEAR}>{children}</Button>);

    logRoles(baseElement);
    screen.logTestingPlaygroundURL();

    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should render a button with a class name', () => {
    const expectedClassName = `button_kit_${ButtonKits.PRYMARY_M_GREEN}`;
    render(<Button kit={ButtonKits.PRYMARY_M_GREEN}>Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass(expectedClassName);
  });

  it('should invoke the onClick callback / using fireEvent', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} kit={ButtonKits.PRYMARY_M_GREEN}>Click me</Button>);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should invoke the onClick callback / using userEvent', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} kit={ButtonKits.PRYMARY_M_GREEN}>Click me</Button>);
    const button = screen.getByRole('button');
    await userEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
