import * as React from "react"
import "./Navbar.css"
import logo from "./logo.png"

export default function Navbar() {
  return (
    <nav className="navbar">
      <img src={logo}></img>
      <div className="content">
        <a href="/"> Home </a>
        <a href="/#buy"> Buy Now</a>
        <a href="/#about"> About Us </a>
        <a href="/#contact"> Contact Us</a>
      </div>
    </nav>
  )
}
