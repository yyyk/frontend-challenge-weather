import { render, screen } from '@testing-library/react';
import Sun from 'src/components/icons/Sun';

describe('<Sun>', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Sun />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('has title tag', () => {
    render(<Sun />);
    expect(screen.getByText('Clear', { selector: 'title' })).toBeTruthy();
  });
});
