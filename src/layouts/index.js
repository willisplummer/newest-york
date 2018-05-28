import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Navbar from '../components/Navbar'
import Logo from '../components/Logo'
import './all.sass'

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet title="Newest York" />
    <Logo color="red"/>
    <Navbar />
    <div>{children()}</div>
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
