import styled from 'styled-components';
import { FONT_SIZE_DEFAULT } from '../../styles/font-size';

const Button = styled('button')`
  display: inline-block;
  border: none;
  padding: 1rem 2rem;
  margin: 0;
  text-decoration: none;
  background: none;
  color: inherit;
  font-family: sans-serif;
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
