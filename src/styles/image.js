import styled from 'styled-components';
import media from './media-queries';

const Image = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  height: auto;
  border-radius: 7px;

  ${media.small`
    width: auto;
    height: 400px;
  `};
`;

export default Image;
