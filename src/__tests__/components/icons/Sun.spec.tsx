import { render } from '@testing-library/react';
import Sun from 'src/components/icons/Sun';

describe('<Sun>', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Sun />);
    expect(asFragment()).toMatchSnapshot();
  });
});
