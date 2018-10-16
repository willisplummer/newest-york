import React, { Component } from 'react';
import styled from 'styled-components';
import { BORDER_WIDTH } from '../../styles/border-width';

const COMPONENT_ID = 'subscribe-cta-input';

const validateEmail = email =>
  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);

const successHash = `#success`;
const submitSuccessHash =
  typeof window !== 'undefined' && window.location.hash === successHash;

const encode = data =>
  Object.keys(data)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');

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
        fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: encode({ 'form-name': 'subscribe', email: this.state.value }),
        })
          .then(() => this.setState({ value: '', isSubmitted: true }))
          .catch(console.log);
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
        {this.state.isSubmitted || submitSuccessHash ? (
          <Submitted>{successString}</Submitted>
        ) : (
          <form
            name="subscribe"
            action="/about#success"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
          >
            <input type="hidden" name="form-name" value="subscribe" />
            <SubscribeInput
              id={COMPONENT_ID}
              placeholder="Subscribe"
              type="text"
              name="email"
              onChange={this.handleUserInput}
              value={this.state.value}
            />
          </form>
        )}
      </Wrap>
    );
  }
}

export default SubscribeCTA;

const Wrap = styled.div`
  width: 85%;
  border: solid ${BORDER_WIDTH};
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
