import React, { FC, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Weather, WeatherType } from 'src/models/weather';
import { fluidType } from 'src/utils/fluidType';
import colors from 'src/constants/colors';
import { useSelectedWeather } from 'src/providers/SelectedWeather';
import Sun from './icons/Sun';
import Cloud from './icons/Cloud';

export interface CardProp {
  weather: Weather;
}

const Container = styled.button`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: flex-start;
  margin: 0;
  padding: 15% 21%;
  border: none;
  border-radius: 6px;
  text-align: center;
  background: transparent;
  cursor: pointer;

  &:hover {
    background: #3b3f69;
  }

  &.selected {
    background: #51557a;
    cursor: default;

    &:hover {
      background: #51557a;
    }
  }
`;

const HourText = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: ${fluidType(300, 1920, 8, 48)};
  line-height: ${fluidType(300, 1920, 10, 48)};
  color: ${colors.text.gray};
`;

const SVGIconContainer = styled.div`
  width: 100%;
  margin: 25% 0;
`;

const TemperatureText = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: ${fluidType(300, 1920, 12, 82)};
  line-height: ${fluidType(300, 1920, 15, 96)};
  color: ${colors.white};
`;

const Card: FC<CardProp> = ({ weather }) => {
  const { selectedWeather, setSelectedWeather } = useSelectedWeather();
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (
      selectedWeather?.hour === weather.hour &&
      selectedWeather?.type === weather.type &&
      selectedWeather?.temperature === weather.temperature
    ) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [weather, selectedWeather]);

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

  const hour = `${weather.hour < 10 ? '0' : ''}${weather.hour}:00`;

  const handleClick = () => {
    setSelectedWeather({ ...weather });
  };

  return (
    <Container onClick={handleClick} className={isSelected ? 'selected' : ''} type="button">
      <HourText>{hour}</HourText>
      <SVGIconContainer>{renderIcon(weather.type)}</SVGIconContainer>
      <TemperatureText>{weather.temperature}&deg;</TemperatureText>
    </Container>
  );
};

export default Card;
