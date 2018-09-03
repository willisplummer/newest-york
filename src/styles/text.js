import styled from 'styled-components';
import FONT_FAMILY from './font-family';
import { FONT_SIZE_DEFAULT } from './font-size';

const StyledText = styled.span`
  color: inherit;
  font-size: ${FONT_SIZE_DEFAULT};
  font-family: ${FONT_FAMILY};
  text-decoration: none;
  line-height: 120%;

  overflow-wrap: break-word;
  word-wrap: break-word;
  -webkit-hyphens: auto;
  -ms-hyphens: auto;
  -moz-hyphens: auto;
  hyphens: auto;
`;

export default StyledText;
