export interface OpenWeatherMapData {
  city: {
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    id: number;
    name: string;
  };
  cnt: number;
  cod: string;
  list: Array<{
    clouds: {
      all: number;
    };
    dt: number;
    dt_txt: string;
    main: {
      grnd_level: number;
      humidity: number;
      pressure: number;
      sea_level: number;
      temp: number; // in Kelvin unit
      temp_kf: number;
      temp_max: number; // in Kelvin unit
      temp_min: number; // in Kelvin unit
    };
    sys: {
      pod: string;
    };
    weather: Array<{
      description: string;
      icon: string;
      id: number;
      main: string;
    }>;
    wind: {
      deg: number;
      speed: number;
    };
  }>;
}
