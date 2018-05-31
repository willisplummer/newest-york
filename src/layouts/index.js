import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Logo from '../components/Logo'
import './all.sass'

const logoWrapStyles = {
  width: '100px',
  // transform: 'rotate(-90deg)'
  // width: 'auto',
  // position: 'fixed',
  // left: 0,
  // top: 100,
}

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet title="Newest York" />
    <div style={logoWrapStyles}>
      <Logo color="red" />
    </div>
    <div>{children()}</div>
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
