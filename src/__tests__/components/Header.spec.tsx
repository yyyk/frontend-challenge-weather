import { render, screen } from '@testing-library/react';
import { Weather, WeatherData } from 'src/models/weather';
import MOCK_DATA from 'src/__tests__/mock/weatherData.json';
import SelectedWeatherProvider from 'src/providers/SelectedWeather';
import Header from 'src/components/Header';

describe('<Header>', () => {
  let weatherData: WeatherData;
  let selectedWeather: Weather;

  beforeEach(() => {
    weatherData = MOCK_DATA as WeatherData;
    selectedWeather = {
      hour: 3,
      type: 'Clear',
      temperature: -5,
    };
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<Header weatherData={weatherData} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders Sun icon', async () => {
    await render(
      <SelectedWeatherProvider initialState={selectedWeather}>
        <Header weatherData={weatherData} />
      </SelectedWeatherProvider>,
    );
    expect(screen.getByText('Clear', { selector: 'title' })).toBeTruthy();
  });

  it('renders Cloudy icon', async () => {
    selectedWeather = {
      hour: 3,
      type: 'Clouds',
      temperature: -5,
    };
    await render(
      <SelectedWeatherProvider initialState={selectedWeather}>
        <Header weatherData={weatherData} />
      </SelectedWeatherProvider>,
    );
    expect(screen.getByText('Cloudy', { selector: 'title' })).toBeTruthy();
  });

  it('renders weather text', async () => {
    selectedWeather = {
      hour: 3,
      type: 'Clouds',
      temperature: -5,
    };
    await render(
      <SelectedWeatherProvider initialState={selectedWeather}>
        <Header weatherData={weatherData} />
      </SelectedWeatherProvider>,
    );
    expect(screen.getByText('Clouds')).toBeTruthy();
  });

  it('renders max temperature and minimum temperature', async () => {
    await render(
      <SelectedWeatherProvider initialState={selectedWeather}>
        <Header weatherData={weatherData} />
      </SelectedWeatherProvider>,
    );
    expect(screen.getByText('6° / -5°')).toBeTruthy();
  });

  it("renders selected hour's temperature", async () => {
    await render(
      <SelectedWeatherProvider initialState={selectedWeather}>
        <Header weatherData={weatherData} />
      </SelectedWeatherProvider>,
    );
    expect(screen.getByText('-5°')).toBeTruthy();
  });

  it('renders city name', async () => {
    await render(
      <SelectedWeatherProvider initialState={selectedWeather}>
        <Header weatherData={weatherData} />
      </SelectedWeatherProvider>,
    );
    expect(screen.getByText('Munich')).toBeTruthy();
  });

  it('renders day', async () => {
    await render(
      <SelectedWeatherProvider initialState={selectedWeather}>
        <Header weatherData={weatherData} />
      </SelectedWeatherProvider>,
    );
    expect(screen.getByText('Monday')).toBeTruthy();
  });

  it('renders date and month', async () => {
    await render(
      <SelectedWeatherProvider initialState={selectedWeather}>
        <Header weatherData={weatherData} />
      </SelectedWeatherProvider>,
    );
    expect(screen.getByText('20. February')).toBeTruthy();
  });
});
