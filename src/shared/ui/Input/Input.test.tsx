import { Input, InputTypes, InputKits } from './Input';
import { render, screen } from '@testing-library/react';

describe('Input', () => {
  it('should render an Input with a text type', () => {
    const inputType = InputTypes.TEXT;
    render(<Input type={inputType} />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', inputType);
  });

  it('should render an Input with a color type', () => {
    const inputType = InputTypes.COLOR;
    const { container } = render(<Input type={inputType} />);
    const inputElement = container.querySelector('input');
    expect(inputElement).toHaveAttribute('type', inputType);
  });

  it('should render an Input with a specific kit', () => {
    const inputKit = InputKits.PRIMARY_M;
    const expectedClassName = `input_kit_${inputKit}`;
    render(<Input kit={inputKit} />);
    expect(screen.getByRole('textbox')).toHaveClass(expectedClassName);
  });

  it('should render an Input with validation error', () => {
    const validationError = 'This field is required';
    render(<Input validationError={validationError} />);
    expect(screen.getByText(validationError)).toBeInTheDocument();
  });
});
