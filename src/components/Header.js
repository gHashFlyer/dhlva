import React from "react";
import {Link} from 'react-router-dom'
// import "../App.css"

const Header = (props) => {

    function handleLogout(){
        props.appLogout();
    }

    return <React.Fragment>
        <div className="header">
            <div className="header-menu">
                <Link to='/'><button className="header-menu-item">Home</button></Link>
                <Link to='/'><button onClick={handleLogout} className="header-menu-item">Logout</button></Link>                
                {/* <Link to='/'><button className="header-menu-item">Home</button></Link>
                <Link to='/'><button className="header-menu-item">Home</button></Link>
                <Link to='/'><button className="header-menu-item">Home</button></Link> */}

            </div>
        </div>
    </React.Fragment>
}
export default Header;

