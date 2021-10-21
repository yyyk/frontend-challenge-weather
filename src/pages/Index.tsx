import React, { FC, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import moment from 'moment';
import { OPEN_WEATHER_MAP_URL } from 'src/constants/openWeatherMapUrl';
import colors from 'src/constants/colors';
import { parseOpenWeatherMapData } from 'src/utils/parseOpenWeatherMapData';
import { OpenWeatherMapData } from 'src/models/openWeatherMapData';
import { WeatherData } from 'src/models/weather';
import { useSelectedWeather } from 'src/providers/SelectedWeather';
import Header from 'src/components/Header';
import Card from 'src/components/Card';

const NUMBER_OF_CARD_TO_DISPLAY = 8;

const PageContainer = styled.main`
  width: 100vw;
  height: 100vh;
  background: ${colors.background.darkBlue};
`;

const LoadingMessage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  color: ${colors.white};
`;

const Container = styled.div`
  width: 100%;
  height: auto;
  min-height: 100vh;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: stretch;
  padding: 5% 0;
  overflow: scroll;
  background: ${colors.background.darkBlue};

  > * + * {
    margin: 7.5% 0 0;
  }
`;

const CardList = styled.ul`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  overflow-y: hidden;
  overflow-x: scroll;
  list-style: none;
  padding: 0;
`;

const CardContainer = styled.li`
  width: ${100 / NUMBER_OF_CARD_TO_DISPLAY}%;
  flex: 1 0 ${100 / NUMBER_OF_CARD_TO_DISPLAY}%;
  padding: 0 0.6%;
  margin: 0;
`;

const Index: FC<{}> = () => {
  const { selectedWeather, setSelectedWeather } = useSelectedWeather();
  const [weatherData, setWeatherData] = useState(null as WeatherData | null);
  const resultsRef = useRef(null);

  useEffect(() => {
    async function getWeather() {
      try {
        const res = await fetch(OPEN_WEATHER_MAP_URL);
        const data: OpenWeatherMapData = await res.json();
        const weatherData = parseOpenWeatherMapData(data);
        if (weatherData?.weatherList) {
          const hour = moment().hour();
          const index = weatherData.weatherList?.findIndex((weather) => weather.hour === hour);
          if (index > -1) {
            setSelectedWeather({ ...weatherData?.weatherList[index] });
          }
        }
        setWeatherData(weatherData);
      } catch (err) {
        console.error(err);
      }
    }
    getWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    /**
     * On the first render, the current hour weather card
     * is scrolled into the view.
     */
    if (resultsRef.current) {
      (resultsRef.current as any).scrollLeft =
        (selectedWeather?.hour ?? 0) * (window.innerWidth / NUMBER_OF_CARD_TO_DISPLAY);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weatherData]);

  return (
    <PageContainer>
      {weatherData === null && <LoadingMessage>Loading...</LoadingMessage>}
      {weatherData && (
        <Container>
          <Header weatherData={weatherData} />
          <CardList ref={resultsRef}>
            {weatherData.weatherList.map((weather, index) => (
              <CardContainer key={index}>
                <Card weather={weather} />
              </CardContainer>
            ))}
          </CardList>
        </Container>
      )}
    </PageContainer>
  );
};

export default Index;
