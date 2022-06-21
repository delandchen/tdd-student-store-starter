import * as React from "react";
import "./Logo.css"
import { Link } from "react-router-dom"
import logo from "./logo.png"

export default function Logo() {
    return (
        <div className="logo">
            <Link id="logo-link" to="/">
                <img id="logo-img" src={logo}></img>
            </Link>
        </div>
    )
}