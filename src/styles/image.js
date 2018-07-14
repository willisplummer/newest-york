import React, { Fragment } from 'react';
import styled from 'styled-components';
import media from './media-queries';

const ImageWithCaption = props => (
  <Fragment>
    <Image {...props} />
    <Caption>{props.alt}</Caption>
  </Fragment>
);

export const Image = styled.img`
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

const Caption = styled.div`
  padding: 10px 0;
  width: 100%;
  text-align: center;
`;

export default ImageWithCaption;
