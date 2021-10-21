import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import MOCK_DATA from 'src/__tests__/mock/openWeatherMapData.json';
import SelectedWeatherProvider from 'src/providers/SelectedWeather';
import IndexPage from 'src/pages/Index';

jest.mock('src/components/Header', () => () => <div data-testid="header" />);
jest.mock('src/components/Card', () => () => <div data-testid="card" />);

describe('<IndexPage> (loading)', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(null),
    } as any);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('matches snapshot', async () => {
    let asFragment;
    await act(async () => {
      const result = await render(
        <SelectedWeatherProvider>
          <IndexPage />
        </SelectedWeatherProvider>,
      );
      asFragment = result.asFragment;
    });
    expect((asFragment as any)()).toMatchSnapshot();
  });

  it('displays loading message', async () => {
    const message = 'Loading...';
    await act(async () => {
      await render(
        <SelectedWeatherProvider>
          <IndexPage />
        </SelectedWeatherProvider>,
      );
    });
    expect(screen.getByText(message)).toBeTruthy();
  });
});

describe('<IndexPage> (loaded)', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(MOCK_DATA),
    } as any);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('matches snapshot', async () => {
    let asFragment;
    await act(async () => {
      const result = await render(
        <SelectedWeatherProvider>
          <IndexPage />
        </SelectedWeatherProvider>,
      );
      asFragment = result.asFragment;
    });
    expect((asFragment as any)()).toMatchSnapshot();
  });

  it('renders Header component', async () => {
    await act(async () => {
      await render(
        <SelectedWeatherProvider>
          <IndexPage />
        </SelectedWeatherProvider>,
      );
    });
    expect(screen.getByTestId(/header/)).toBeInTheDocument();
  });

  it('renders Card component', async () => {
    await act(async () => {
      await render(
        <SelectedWeatherProvider>
          <IndexPage />
        </SelectedWeatherProvider>,
      );
    });
    expect(screen.getAllByTestId(/card/).length).toBeGreaterThan(0);
  });
});
