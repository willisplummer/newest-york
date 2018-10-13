import React from 'react';
import { BORDER_WIDTH_THICK } from '../../styles/border-width';

const X = ({ color = '#000000' }) => (
  <svg
    id="Layer_1"
    data-name="Layer 1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 62.57 33.26"
  >
    <title>carrot</title>
    <polyline
      points="61.52 31.84 31.29 2.11 1.06 32.19"
      fill="none"
      stroke={color}
      strokeMiterlimit="10"
      strokeWidth={BORDER_WIDTH_THICK}
    />
  </svg>
);

export default X;
