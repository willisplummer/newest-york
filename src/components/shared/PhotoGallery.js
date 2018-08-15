import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import ImageWithCaption from '../../styles/image';

const Gallery = ({ imgs, current, onDecrement, onIncrement }) => (
  <Fragment>
    <Wrapper>
      <Image src={imgs[current]} />
      <ButtonLeft onClick={onDecrement} />
      <ButtonRight onClick={onIncrement} />
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
  position: relative;
  width: 600px;
  margin: 0 auto;
  background: #d9e5f7;
`;

const Image = styled(ImageWithCaption)`
  margin: 0 auto;
  max-width: 600px;
`;

const Caption = styled.div`
  padding: 10px 0;
  width: 100%;
  text-align: center;
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
  left: -20px;
`;

const ButtonRight = CircleButton.extend`
  right: -20px;
`;
