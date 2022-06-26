import * as React from 'react'
import "./Receipt.css"

export default function Receipt({ receipt }) {
    return (
        <div className="receipt">
            <h2> Receipt </h2>
            <p> Name: {receipt.name} </p>
            <p> Email: {receipt.email} </p>
            <p> Total: {receipt.total.toPrecision(3)}</p>
        </div >
    )
}