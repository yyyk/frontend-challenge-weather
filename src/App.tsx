import React from 'react';
import SelectedWeatherProvider from 'src/providers/SelectedWeather';
import IndexPage from 'src/pages/Index';
import 'src/styles/reset.css';

function App() {
  return (
    <SelectedWeatherProvider>
      <IndexPage />
    </SelectedWeatherProvider>
  );
}

export default App;
