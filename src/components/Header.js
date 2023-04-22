import React from "react";
// import "../App.css"

const Header = (props) => {
    return <React.Fragment>
        <div className="header">
            <div className="menu">
            <div className="menu-item"><a href='#'>Home</a></div>
                <div className="menu-item"><a href='#'>About</a></div>
                <div className="menu-item"><a href='#'>Join</a></div>
                <div className="menu-item-logo">Login</div>
            </div>
        </div>

    </React.Fragment>
}
export default Header;