import React from "react";
// import "../App.css"

const Header = (props) => {
    return <React.Fragment>
        <div className="header">
            <div className="menu">
            <div className="menu-item"><a href='#'>UserHome</a></div>
                <div className="menu-item"><a href='#'></a></div>
                <div className="menu-item"><a href='#'>Gamma</a></div>
                <div className="menu-item"><a href='#'>Logout</a></div>
            </div>
        </div>
    </React.Fragment>
}
export default Header;