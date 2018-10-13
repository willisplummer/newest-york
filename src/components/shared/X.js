import React from 'react';
import { BORDER_WIDTH_THICK } from '../../styles/border-width';

const X = ({ color = '#000000' }) => (
  <svg
    id="Layer_1"
    data-name="Layer 1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 63.29 63.29"
  >
    <title>close</title>
    <line
      x1="62.23"
      y1="1.41"
      x2="1.41"
      y2="62.23"
      fill="none"
      stroke={color}
      strokeMiterlimit="10"
      strokeWidth={BORDER_WIDTH_THICK}
    />
    <line
      x1="61.87"
      y1="61.87"
      x2="1.06"
      y2="1.06"
      fill="none"
      stroke={color}
      strokeMiterlimit="10"
      strokeWidth={BORDER_WIDTH_THICK}
    />
  </svg>
);

export default X;
