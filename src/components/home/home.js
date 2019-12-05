import React from 'react';
import Header from "../header/header";
import MenuBar from "../menuBar/menuBar";
import "./home.css"

class Home extends React.Component{
    render() {
        return (
            <div>
                <Header/>
                <div className="content">
                    <MenuBar/>
                </div>
            </div>
        )
    }
}

export default Home;


