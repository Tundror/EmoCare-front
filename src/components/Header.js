import React from "react"
import "../styles/Header.css"
import { FaSmile } from "react-icons/fa"

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <FaSmile className="header-icon" />
        <h1>EmoCare</h1>
      </div>
    </header>
  )
}

export default Header
