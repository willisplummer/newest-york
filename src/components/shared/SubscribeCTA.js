import React, { Component } from 'react';
import styled from 'styled-components';

const COMPONENT_ID = 'subscribe-cta-input';

const validateEmail = email =>
  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);

class SubscribeCTA extends Component {
  constructor(props) {
    super(props);

    this.state = { value: '', isSubmitted: false };
    this.handleUserInput = this.handleUserInput.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keypress', e => {
      if (
        this.state.value &&
        validateEmail(this.state.value) &&
        document.activeElement.id === COMPONENT_ID &&
        e.key === 'Enter'
      ) {
        this.setState({ value: '', isSubmitted: true });
      }
    });
  }

  handleUserInput(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    const successString = "We've added you to our list!";
    return (
      <Wrap>
        {this.state.isSubmitted ? (
          <Submitted>{successString}</Submitted>
        ) : (
          <SubscribeInput
            id={COMPONENT_ID}
            placeholder="Subscribe To Our Mailing List"
            type="text"
            onChange={this.handleUserInput}
            value={this.state.value}
          />
        )}
      </Wrap>
    );
  }
}

export default SubscribeCTA;

const Wrap = styled.div`
  width: 85%;
  border: solid 3px;
`;

const Submitted = styled.div`
  padding: 16px;
`;

const SubscribeInput = styled.input`
  border: none;
  display: inline;
  font-family: inherit;
  font-size: inherit;
  padding: none;
  width: 100%;
  background: transparent;
  color: inherit;
  padding: 16px;
  ::placeholder {
    color: inherit;
  }
  :focus {
    outline: none;
    ::-webkit-input-placeholder {
      color: transparent;
    }
  }
`;
