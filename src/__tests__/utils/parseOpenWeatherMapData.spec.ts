import { OpenWeatherMapData } from 'src/models/openWeatherMapData';
import { parseOpenWeatherMapData } from 'src/utils/parseOpenWeatherMapData';
import MOCK_DATA from 'src/__tests__/mock/openWeatherMapData.json';

describe('parseOpenWeatherMapData', () => {
  it('returns null if no argument is passed', () => {
    expect(parseOpenWeatherMapData()).toBe(null);
  });

  it('returned value contains city name', () => {
    const result = parseOpenWeatherMapData(MOCK_DATA as OpenWeatherMapData);
    expect(result?.city?.name).toBeTruthy();
  });

  it('returned value contains dateText, day, date, month', () => {
    const result = parseOpenWeatherMapData(MOCK_DATA as OpenWeatherMapData);
    expect(result?.dateText).toBeTruthy();
    expect(result?.day).toBeTruthy();
    expect(result?.date).toBeTruthy();
    expect(result?.month).toBeTruthy();
  });

  it('returned value contains max temperature, min temperature', () => {
    const result = parseOpenWeatherMapData(MOCK_DATA as OpenWeatherMapData);
    expect(result?.maxTemperature).toBeTruthy();
    expect(result?.minTemperature).toBeTruthy();
  });

  it('returned value contains weatherList', () => {
    const result = parseOpenWeatherMapData(MOCK_DATA as OpenWeatherMapData);
    expect(result?.weatherList).toBeTruthy();
    expect(result?.weatherList.length).toBeGreaterThan(0);
  });
});
