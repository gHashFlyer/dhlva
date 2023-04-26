import React from "react";
// import "../App.css"

const Header = (props) => {
    return <React.Fragment>
        <div className="header">
            <div className="header-menu">
                <div className="header-menu-item">UserHome<a href='/'></a></div>
                <div className="header-menu-item">ggg<a href='/'></a></div>
                <div className="header-menu-item"><a href='#'>Gamma</a></div>
                <div className="header-menu-item"><a href='#'>Logout</a></div>
            </div>
        </div>
    </React.Fragment>
}
export default Header;