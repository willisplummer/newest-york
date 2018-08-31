import styled from 'styled-components';
import { FONT_SIZE_DEFAULT } from '../../styles/font-size';
import FONT_FAMILY from '../../styles/font-family';

const Button = styled('button')`
  display: inline-block;
  border: none;
  padding: 20px 35px;
  margin: 0;
  text-decoration: none;
  background: none;
  color: inherit;
  font-family: ${FONT_FAMILY};
  font-size: ${FONT_SIZE_DEFAULT};
  cursor: pointer;
  text-align: center;
  -webkit-appearance: none;
  -moz-appearance: none;

  &:focus {
    outline: none;
  }
`;

export default Button;
