import moment from 'moment';
import { OpenWeatherMapData } from 'src/models/openWeatherMapData';
import { WeatherData, WeatherType } from 'src/models/weather';

/**
 * NOTES:
 * - city name is hardcoded here as München is used in the api call.
 * - date for 'today' is selected based on the first date that contains
 *   weather data from 0:00 to 21:00, since the fetched data are dated as February 2017.
 * - weather data are set every 3 hours. To make 24 hour data, each data duplicates next 2 missing hours.
 * - const TODAY is set because the weather on 2017-02-20 is only consisting of 'Clear' and 'Clouds', which svg icons are prepared.
 */

const TODAY = '20-02-2017';

export function parseOpenWeatherMapData(openWeatherMapData: OpenWeatherMapData): WeatherData | null {
  if (!openWeatherMapData) {
    return null;
  }
  const dates: WeatherData[] = [];
  openWeatherMapData.list.forEach((item) => {
    const momentObj = moment(item.dt_txt);
    const dateText = momentObj.format('DD-MM-YYYY');
    const hour = momentObj.hour();
    let index = dates.findIndex((date) => {
      return date.dateText === dateText;
    });
    if (index === -1) {
      dates.push({
        city: {
          name: 'Munich',
        },
        dateText,
        day: momentObj.day(),
        date: momentObj.date(),
        month: momentObj.month(),
        maxTemperature: 0,
        minTemperature: 0,
        weatherList: [],
      });
      index = dates.length - 1;
    }
    for (let i = 0; i < 3; i++) {
      dates[index].weatherList.push({
        hour: hour + i,
        type: item.weather[0].main as WeatherType,
        temperature: Math.round(item.main.temp - 273.15),
      });
    }
  });

  dates.forEach((date) => {
    let minTemp = 0;
    let maxTemp = 0;
    date.weatherList.forEach((weather: any) => {
      if (minTemp > weather.temperature) {
        minTemp = weather.temperature;
      }
      if (maxTemp < weather.temperature) {
        maxTemp = weather.temperature;
      }
    });
    date.minTemperature = minTemp;
    date.maxTemperature = maxTemp;
  });

  const index = dates.findIndex((date) => date.dateText === TODAY);
  if (index > -1) {
    return dates[index];
  }

  let result = dates[0];
  for (let i = 1; i < dates.length; i++) {
    if (dates[i].weatherList.length === 24) {
      result = dates[i];
      break;
    }
    if (dates[i].weatherList.length > result.weatherList.length) {
      result = dates[i];
    }
  }

  return result;
}
