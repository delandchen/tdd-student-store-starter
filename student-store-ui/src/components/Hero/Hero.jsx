import * as React from "react";
import "./Hero.css"
import banner from "./banner.jpg"

export default function Hero() {
    return (
        <div className="hero">
            <img className="hero-img" src={banner}></img>
            <p className="intro"> Welcome! </p>
        </div>
    )
}