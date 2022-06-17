import * as React from "react"
import "./Navbar.css"

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="content">
        <a href="/"> Home </a>
        <a href="/#buy"> Buy Now</a>
        <a href="/#about"> About Us </a>
        <a href="/#contact"> Contact Us</a>
      </div>
    </nav>
  )
}
