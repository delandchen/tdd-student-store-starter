import * as React from 'react'
import "./Receipt.css"

export default function Receipt({ receipt }) {
    return (
        <div className="receipt">
            <h2> Name: {receipt.name} </h2>
            <h2> Email: {receipt.email} </h2>
            <h2> Total Cost: {receipt.total}</h2>
        </div >
    )
}