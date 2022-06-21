import * as React from "react"
import "./Navbar.css"
import Logo from "../Logo/Logo.jsx"
import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="navbar">
      <Logo />
      <div className="content">
        <a href="/"> Home </a>
        <a href="/#buy"> Buy Now</a>
        <a href="/#about"> About Us </a>
        <a href="/#contact"> Contact Us</a>
      </div>
    </nav>
  )
}
