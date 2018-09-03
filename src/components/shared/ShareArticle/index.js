import React, { Component } from 'react';
import styled from 'styled-components';
import Button from '../Button';

const ShareComponent = ({ isCopied, onClick }) => (
  <ShareWrap>
    {isCopied ? (
      'Link Copied To Clipboard!'
    ) : (
      <ShareButton onClick={onClick}>Share ↗</ShareButton>
    )}
  </ShareWrap>
);

class ShareArticle extends Component {
  constructor(props) {
    super(props);

    this.state = { isCopied: false };
    this.copyToClipboard = this.copyToClipboard.bind(this);
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

  copyToClipboard() {
    const textField = document.createElement('textarea');
    textField.innerText = this.props.articleUrl;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
    this.setState({ isCopied: true });
    setTimeout(() => this.setState({ isCopied: false }), 1500);
  }

  render() {
    return (
      <ShareComponent
        isCopied={this.state.isCopied}
        onClick={this.copyToClipboard}
      />
    );
  }
}

export default ShareArticle;

const ShareWrap = styled.div`
  margin-top: 16px;
`;

const ShareButton = Button.extend`
  text-decoration: none;
  border-bottom: none;
  padding: 0;
`;
