import React, {useState} from "react";
import {Link} from 'react-router-dom'

import bg_image1 from "../images/bgimage.png"
import bg_image2 from "../images/multi.png"
import bg_image3 from "../images/green.png"
import bg_image4 from "../images/spray.png"

const Home=(props)=>{

    //const [loggedIn, setLoggedIn] = useState(false)

    return(
        <React.Fragment>
            <div className="home">
                
                <div className="home-banner">
                    <div className="home-banner-a">
                        <img src={bg_image4} />
                    </div>
                    <div className="home-banner-b">
                    <img src={bg_image2} />
                    </div>
                    <div className="home-banner-c">
                    <img src={bg_image3} />
                    </div>
                </div>

                <div className="home-section">
                    <div className="home-section-label">ABOUT VHOG</div>
                    <div className="home-section-content">
                        <p>
                        Virtual Helicopter Operations Group (VHOG) began as an idea in 2023 from a group of friends who share 
                        a passion
                        for aviation and flight simulation, and helicopter operations in particular. Most of us here have many
                        thousands of hours of flight time in large jets and turbprops, and belong to other virtual airlines 
                        that cater to structured flight operations, revenue, landing rates, and other metrics. VHOG is tailored
                        specficially to helicopter operatios using a helicoppters from MSFS2020, X-Plane, FSX, P3D, and FS9.
                        </p>

                        <p className="p-small-black">
                        Currently membership is by invitation only. 
                        {/* Add your name to the _waiting list_(link) and we'll be in touch if a slot opens for general membership. */}
                        </p>

                    </div>

                </div>

                <div className="home-section">
                    <div className="home-section-label">OPERATIONS</div>
                    <div className="home-section-content">
                        <div className="menu">
                            <Link to='/recentflights'><button className="menu-item">Recent Flights</button></Link>
                            <Link to='/flyingnow'><button className="menu-item">Flying Now</button></Link>
                            <Link to='/pilotstories'><button className="menu-item">Pilot Stories</button></Link>
                            {props.loggedIn && <Link to='/userhome'><button className="menu-item">User Home</button></Link>}
                            {!props.loggedIn && <Link to='/login'><button className="menu-item">Login</button></Link>}
                            

                        </div>
                    </div>

                </div>

            </div>
        </React.Fragment>
    )
}
export default Home;