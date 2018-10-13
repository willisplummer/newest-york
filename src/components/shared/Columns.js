import styled from 'styled-components';
import media from '../../styles/media-queries';

const Columns = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;

  ${media.small`
    flex-direction: row;
    justify-content: space-around;
  `};
`;

export const Column = styled.div`
  width: 100%;

  ${media.small`
    width: 45%;
  `};
`;

export default Columns;
