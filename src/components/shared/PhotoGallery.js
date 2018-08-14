import React, { Component } from 'react';
import styled from 'styled-components';
import ImageWithCaption from '../../styles/image';

const Gallery = ({ imgs, current, onDecrement, onIncrement }) => (
  <Wrapper>
    <ImageWithCaption
      src={imgs[current]}
      alt={`${current + 1} of ${imgs.length}`}
    />
    <ButtonLeft onClick={onDecrement} />
    <ButtonRight onClick={onIncrement} />
  </Wrapper>
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
  position: relative;
`;

const CircleButton = styled.button`
  color: yellow;
  background-color: yellow;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  cursor: pointer;
  border: none;
  position: absolute;
  top: 50%;
`;

const ButtonLeft = CircleButton.extend`
  left: 0;
`;

const ButtonRight = CircleButton.extend`
  right: 0;
`;
