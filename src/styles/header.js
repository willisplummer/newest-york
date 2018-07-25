import StyledText from './text';
import { FONT_SIZE_LARGE } from './font-size';

const Header = StyledText.withComponent('div').extend`
  text-align: center;
  width: 100%;
  font-size: ${FONT_SIZE_LARGE};
`;

export default Header;
