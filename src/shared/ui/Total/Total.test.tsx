import { Total } from './Total';
import { render, screen } from '@testing-library/react';

const entity = 'item';
const total = 10;

describe('Total', () => {
  it('should render the total', () => {
    render(<Total entity={entity} total={total} />);
    expect(screen.getByText(total)).toBeInTheDocument();
  });
  
  it('should render the entity in uppercase', () => {
    const expectedEntity = `${entity.toLocaleUpperCase()}:`;
    render(<Total entity={entity} total={total} />);
    expect(screen.getByText(expectedEntity)).toBeInTheDocument();
  });
});
