// Card.js
import styled from 'styled-components';

const baseStyles = {
  width: '200px',
  height: '200px',
  position: 'absolute',
  backgroundColor: 'white',
  padding: '20px',
  border: '1px solid #ccc',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  cursor: 'pointer',
  zIndex: 10,
};

export const CardG = styled.div.attrs(props => ({
  style: {
    ...baseStyles,
    top: `${props.cardPosition.y}px`,
    left: `${props.cardPosition.x}px`,
  },
}))``;

export const CardA = styled.div.attrs(props => ({
  style: {
    ...baseStyles,
    top: `${props.cardPosition.y}px`,
    left: `${props.cardPosition.x}px`,
  },
}))``;

export const CardP = styled.div.attrs(props => ({
  style: {
    ...baseStyles,
    top: `${props.cardPosition.y}px`,
    left: `${props.cardPosition.x}px`,
  },
}))``;
