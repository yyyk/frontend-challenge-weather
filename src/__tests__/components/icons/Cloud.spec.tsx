import { render, screen } from '@testing-library/react';
import Cloud from 'src/components/icons/Cloud';

describe('<Cloud>', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Cloud />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('has title tag', () => {
    render(<Cloud />);
    expect(screen.getByText('Cloudy', { selector: 'title' })).toBeTruthy();
  });
});
