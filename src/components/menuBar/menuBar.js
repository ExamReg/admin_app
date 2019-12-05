import React from 'react'
import "./menuBar.css"

export default class MenuBar extends React.Component{
    render() {
        return (
            <div className="list-menu">
                <ul>
                    <li>This is line one</li>
                    <li>This is line Tow</li>
                </ul>
            </div>
        )
    }
}