import React from "react";
import {Link} from 'react-router-dom'
// import "../App.css"

const Header = (props) => {

    return <React.Fragment>
        <div className="header">
            <div className="header-menu">
                <Link to='/'><button className="header-menu-item">Home</button></Link>
                <div className="header-menu-pagetitle">{props.title}</div>
                {/* <Link to='/'><button className="header-menu-item"></button></Link> */}
                {/* <Link to='/'><button className="header-menu-item">Home</button></Link>
                <Link to='/'><button className="header-menu-item">Home</button></Link>
                <Link to='/'><button className="header-menu-item">Home</button></Link> */}

            </div>
        </div>
    </React.Fragment>
}
export default Header;

