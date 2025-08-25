import { Signborder } from './Signborder';
import { render, screen } from '@testing-library/react';

describe('Signborder', () => {
  it('should render the text', () => {
    const expectedText = 'Hello there!';
    render(<Signborder text={expectedText} />);
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
