import { City } from './city';

export type WeatherType = 'Clear' | 'Clouds';

export interface Weather {
  hour: number;
  type: WeatherType;
  temperature: number; // in Celsius unit
}

export interface WeatherData {
  city: City;
  dateText: string;
  day: number;
  date: number;
  month: number;
  maxTemperature: number; // in Celsius unit
  minTemperature: number; // in Celsius unit
  weatherList: Weather[];
}
