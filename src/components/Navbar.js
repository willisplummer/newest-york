import React from 'react'
import Link from 'gatsby-link'

import github from '../img/github-icon.svg'
import logo from '../img/logo.svg'

const Navbar = () => (
  <nav className="navbar is-transparent">
    <div className="container">
      <div className="navbar-start">
        <span className="navbar-item">
          May Issue
        </span>
      </div>
      <div className="navbar-end">
        <Link className="navbar-item" to="/about">
          About
        </Link>
        <Link className="navbar-item" to="/about">
          Archive
        </Link>
        <a
          className="navbar-item"
          href="http://www.newestyork.co/buy-a-book/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Shop
        </a>
        <a
          className="navbar-item"
          href="http://www.newestyork.co/blog/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Etc
        </a>
      </div>
    </div>
  </nav>
)

export default Navbar
