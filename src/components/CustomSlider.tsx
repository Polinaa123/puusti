import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';

interface SliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  unit?: string;
}

const SliderContainer = styled.div`
  width: 100%;
  max-width: 700px;
  padding: 30px 0 20px;
  position: relative;
`;

const SliderTrack = styled.div`
  width: 100%;
  height: 4px;
  background-color: #e0e0e0;
  border-radius: 2px;
  position: relative;
`;

const SliderFill = styled.div<{ fillPercentage: number }>`
  position: absolute;
  height: 100%;
  width: ${props => props.fillPercentage}%;
  background-color: #49CA38;
  border-radius: 2px;
`;

const SliderThumb = styled.div<{ position: number }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: white;
  border: 2px solid #49CA38;
  position: absolute;
  top: 50%;
  left: ${props => props.position}%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  z-index: 2;
`;

const SliderMarks = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  width: 100%;
`;

const SliderMark = styled.div`
  font-size: 14px;
  color: #666;
  position: relative;
  text-align: center;
  font-family: 'Kanit', sans-serif;
  
  &::before {
    content: '';
    position: absolute;
    top: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 1px;
    height: 8px;
    background-color: #ccc;
  }
`;

const ValueBubble = styled.div<{ position: number; visible: boolean }>`
  position: absolute;
  top: -30px;
  left: ${props => props.position}%;
  transform: translateX(-50%);
  background-color: #49CA38;
  color: white;
  padding: 4px 8px;
  border-radius: 50%;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  font-family: 'Kanit', sans-serif;
  z-index: 3;
  opacity: ${props => props.visible ? 1 : 0};
  transition: opacity 0.2s ease;
  pointer-events: none;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid #49CA38;
  }
`;

const CustomSlider: React.FC<SliderProps> = ({ min, max, value, onChange, unit = '' }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  const getPercentage = (value: number) => {
    return ((value - min) / (max - min)) * 100;
  };
  
  const getValueFromPosition = (position: number) => {
    const percentage = position / 100;
    const value = percentage * (max - min) + min;
    return Math.round(value);
  };
  
  const handleMouseDown = () => {
    setIsDragging(true);
  };
  
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging && sliderRef.current) {
        const rect = sliderRef.current.getBoundingClientRect();
        const position = ((e.clientX - rect.left) / rect.width) * 100;
        const clampedPosition = Math.max(0, Math.min(position, 100));
        const newValue = getValueFromPosition(clampedPosition);
        onChange(newValue);
      }
    },
    [isDragging, min, max, onChange]
  );
  
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const position = ((e.clientX - rect.left) / rect.width) * 100;
      const clampedPosition = Math.max(0, Math.min(position, 100));
      const newValue = getValueFromPosition(clampedPosition);
      onChange(newValue);
    }
  };
  
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);
  
  const percentage = getPercentage(value);
  const showBubble = isHovered || isDragging;
  
  const marks = [min, 90, 180, 270, max].map(mark => (
    <SliderMark key={mark}>{mark}{unit}</SliderMark>
  ));
  
  return (
    <SliderContainer ref={sliderRef} onClick={handleClick}>
      <ValueBubble 
        position={percentage}
        visible={showBubble}
      >
        {value}{unit}
      </ValueBubble>
      <SliderTrack>
        <SliderFill fillPercentage={percentage} />
        <SliderThumb 
          position={percentage} 
          onMouseDown={handleMouseDown}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </SliderTrack>
      <SliderMarks>
        {marks}
      </SliderMarks>
    </SliderContainer>
  );
};

export default CustomSlider;