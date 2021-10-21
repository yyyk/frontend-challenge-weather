import React, { createContext, FC, useContext, useState } from 'react';
import { Weather } from 'src/models/weather';

const initialSelectedWeatherState: Weather | null = null;

export interface ISelectedWeatherContext {
  selectedWeather: Weather | null;
  setSelectedWeather: (weather: Weather) => void;
}

const SelectedWeatherContext = createContext({
  selectedWeather: null as Weather | null,
  setSelectedWeather: (weather: Weather) => {},
});

const SelectedWeatherProvider: FC<{ initialState?: Weather }> = ({
  children,
  initialState = initialSelectedWeatherState,
}) => {
  const [selectedWeather, setSelectedWeather] = useState(initialState as Weather | null);

  return (
    <SelectedWeatherContext.Provider value={{ selectedWeather, setSelectedWeather }}>
      {children}
    </SelectedWeatherContext.Provider>
  );
};

const useSelectedWeather = (): ISelectedWeatherContext => useContext(SelectedWeatherContext);

export { SelectedWeatherProvider as default, useSelectedWeather };
