import React, { FC } from 'react';
import styled from '@emotion/styled';
import { DAY_LIST } from 'src/constants/dayList';
import { MONTH_LIST } from 'src/constants/monthList';
import colors from 'src/constants/colors';
import { WeatherData, WeatherType } from 'src/models/weather';
import { fluidType } from 'src/utils/fluidType';
import { useSelectedWeather } from 'src/providers/SelectedWeather';
import Sun from './icons/Sun';
import Cloud from './icons/Cloud';

export interface HeaderProps {
  weatherData: WeatherData;
}

const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-evenly;
  align-items: flex-start;
  background: ${colors.background.darkBlue};
`;

const SVGIconContainer = styled.div`
  width: 17%;
  height: auto;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  align-self: stretch;
`;

const TemperatureContainer = styled.div`
  width: 23.33%;
`;

const TemperatureText = styled.div`
  font-style: normal;
  font-weight: bold;
  color: ${colors.white};
  font-size: ${fluidType(300, 1920, 38, 246)};
  line-height: ${fluidType(300, 1920, 40, 254)};
  text-align: center;
`;

const SubText = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: ${fluidType(300, 1920, 8, 48)};
  line-height: ${fluidType(300, 1920, 10, 48)};
  color: ${colors.text.gray};
  margin: 0 0 1.6vw;
`;

const TemperatureInfoText = styled(SubText)`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
`;

const DateContainer = styled.div`
  width: auto;
`;

const CityNameText = styled(SubText)``;

const DateText = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: ${fluidType(300, 1920, 15, 99)};
  line-height: ${fluidType(300, 1920, 20, 124)};
  color: ${colors.white};
`;

const Header: FC<HeaderProps> = ({ weatherData }) => {
  const { selectedWeather } = useSelectedWeather();
  const renderIcon = (type: WeatherType) => {
    switch (type) {
      case 'Clear':
        return <Sun />;
      case 'Clouds':
        return <Cloud />;
      default:
        return null;
    }
  };
  return (
    <Container>
      <SVGIconContainer>{selectedWeather && renderIcon(selectedWeather?.type)}</SVGIconContainer>
      <TemperatureContainer>
        <TemperatureInfoText>
          <div>{selectedWeather?.type}</div>
          <div>
            {weatherData.maxTemperature}&deg; / {weatherData.minTemperature}&deg;
          </div>
        </TemperatureInfoText>
        <TemperatureText>{selectedWeather?.temperature}&deg;</TemperatureText>
      </TemperatureContainer>
      <DateContainer>
        <CityNameText>{weatherData?.city?.name}</CityNameText>
        <DateText>{DAY_LIST[weatherData?.day]}</DateText>
        <DateText>
          {weatherData.date}. {MONTH_LIST[weatherData.month]}
        </DateText>
      </DateContainer>
    </Container>
  );
};

export default Header;
