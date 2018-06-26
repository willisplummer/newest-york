import styled from 'styled-components';
import media from '../../styles/media-queries';

const Columns = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;

  ${media.small`
    flex-direction: row;
  `};
`;

export const Column = styled.div`
  flex: 1;
`;

export default Columns;
