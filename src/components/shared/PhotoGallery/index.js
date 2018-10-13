import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import ImageWithCaption from '../../../styles/image';

import pointer from './pointer.svg'; // Tell Webpack this JS file uses this image

const Gallery = ({ imgs, current, onDecrement, onIncrement }) => (
  <Fragment>
    <Wrapper>
      <Image src={imgs[current]} />
      <ClearButtonLeft onClick={onDecrement} />
      <ClearButtonRight onClick={onIncrement} />
    </Wrapper>
    <Caption>{`${current + 1} of ${imgs.length}`}</Caption>
  </Fragment>
);

class PhotoGallery extends Component {
  constructor(props) {
    super(props);

    this.state = { current: 0 };
    this.onIncrement = this.onIncrement.bind(this);
    this.onDecrement = this.onDecrement.bind(this);
  }

  onIncrement() {
    const newState =
      this.state.current === this.props.imgs.length - 1
        ? 0
        : this.state.current + 1;
    this.setState({ current: newState });
  }

  onDecrement() {
    const newState =
      this.state.current === 0
        ? this.props.imgs.length - 1
        : this.state.current - 1;
    this.setState({ current: newState });
  }

  render() {
    return (
      <Gallery
        imgs={this.props.imgs}
        current={this.state.current}
        onIncrement={this.onIncrement}
        onDecrement={this.onDecrement}
      />
    );
  }
}

export default PhotoGallery;

const Wrapper = styled.div`
  height: 25rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ClearButtonLeft = styled.button`
  background: transparent;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 50%;
  border: none;

  cursor: url(${pointer}) 43 27, auto;

  :focus {
    outline: none;
  }
`;

const ClearButtonRight = ClearButtonLeft.extend`
  left: 50%;
`;

const Image = styled(ImageWithCaption)`
  margin: 0 auto;
  max-height: 100%;
`;

const Caption = styled.div`
  padding: 10px 0;
  width: 100%;
  text-align: center;
`;
