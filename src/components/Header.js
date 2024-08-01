import React from "react";
import {Link} from 'react-router-dom'
// import "../App.css"

const Header = (props) => {

    return <React.Fragment>
        <div className="header">
            <div className="header-menu">
            <div className="header-menu-pagetitle">{props.title}</div>
            </div>
        </div>
    </React.Fragment>
}
export default Header;

