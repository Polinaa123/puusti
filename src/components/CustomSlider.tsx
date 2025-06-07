import React, { useState } from 'react';
import styled from 'styled-components';

interface SliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  unit?: string;
  intervals: number[];
}

const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
`;

const SliderInput = styled.input`
  width: 100%;
  margin: 10px 0;
  appearance: none;
  background: #ddd;
  height: 4px;
  border-radius: 2px;
  outline: none;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    background: #49ca38;
    border-radius: 50%;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background: #49ca38;
    border-radius: 50%;
    cursor: pointer;
  }
`;

const SliderLabels = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 14px;
  color: #333;
  font-family: 'Kanit', sans-serif;
`;

const Bubble = styled.div<{ position: number; visible: boolean }>`
  position: absolute;
  top: -30px;
  left: ${(props) => props.position}%;
  transform: translateX(-50%);
  background-color: #49ca38;
  color: white;
  padding: 5px 10px;
  border-radius: 10px;
  font-size: 12px;
  font-family: 'Kanit', sans-serif;
  white-space: nowrap;
  transition: left 0.1s ease, opacity 0.3s ease;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  pointer-events: none;
`;

const CustomSlider: React.FC<SliderProps> = ({ min, max, value, onChange, unit = '', intervals }) => {
  const [bubblePosition, setBubblePosition] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    onChange(newValue);
    const percentage = ((newValue - min) / (max - min)) * 100;
    setBubblePosition(percentage);
  };

  const handleInteractionStart = () => {
    setIsInteracting(true);
  };

  const handleInteractionEnd = () => {
    setIsInteracting(false);
  };

  return (
    <SliderContainer>
      <Bubble position={bubblePosition} visible={isInteracting}>
        {value} {unit}
      </Bubble>
      <SliderInput
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={handleInputChange}
        onMouseDown={handleInteractionStart}
        onMouseUp={handleInteractionEnd}
        onTouchStart={handleInteractionStart}
        onTouchEnd={handleInteractionEnd}
      />
      <SliderLabels>
        {intervals.map((interval) => (
          <span key={interval}>{interval} {unit}</span>
        ))}
      </SliderLabels>
    </SliderContainer>
  );
};

export default CustomSlider;