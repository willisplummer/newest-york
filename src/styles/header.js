import StyledText from './text';

const Header = StyledText.withComponent('div').extend`
  text-align: center;
  width: 100%;
  font-size: 36px;
`;

export default Header;
