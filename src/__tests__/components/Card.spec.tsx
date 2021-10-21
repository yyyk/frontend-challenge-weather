import { render, screen, fireEvent } from '@testing-library/react';
import { Weather } from 'src/models/weather';
import SelectedWeatherProvider from 'src/providers/SelectedWeather';
import Card from 'src/components/Card';

describe('<Card>', () => {
  let weather: Weather;

  beforeEach(() => {
    weather = {
      hour: 0,
      type: 'Clear',
      temperature: 0,
    };
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<Card weather={weather} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders hour as 24-hour clock display', () => {
    render(<Card weather={weather} />);
    expect(screen.getByText('00:00')).toBeTruthy();

    weather.hour = 14;
    render(<Card weather={weather} />);
    expect(screen.getByText('14:00')).toBeTruthy();
  });

  it('renders temperature with degree', () => {
    render(<Card weather={weather} />);
    expect(screen.getByText('0°')).toBeTruthy();
  });

  it('renders Sun icon', () => {
    render(<Card weather={weather} />);
    expect(screen.getByText('Clear', { selector: 'title' })).toBeTruthy();
  });

  it('renders Cloud icon', () => {
    weather.type = 'Clouds';
    render(<Card weather={weather} />);
    expect(screen.getByText('Cloudy', { selector: 'title' })).toBeTruthy();
  });

  it('is selected, when it is clicked', () => {
    const { container } = render(
      <SelectedWeatherProvider>
        <Card weather={weather} />
      </SelectedWeatherProvider>,
    );
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(container.getElementsByClassName('selected').length).toBe(1);
  });
});
