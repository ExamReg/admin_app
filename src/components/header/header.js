import React from 'react'
import "./header.css"
import eRerender from "../../utils/eventsRerender";
class Header extends React.Component{
    logOut = () => {
        localStorage.removeItem("token");
        eRerender.emit("re-render", {});
    };
    render() {
        return (
            <div>
                <div className="header">
                    <div className="header-left">
                        <input type="button" value={"Logo"}/>
                    </div>
                    <div className="header-right">
                        <input type="button" value={"Logout"} onClick={this.logOut}/>
                    </div>
                </div>
            </div>
        );
    }
}


export default Header;