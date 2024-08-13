import React, {useState} from "react";
import {Link} from 'react-router-dom'

import bg_image1 from "../images/bgimage.png"
import bg_image2 from "../images/bell407.jpg"
import bg_image3 from "../images/bowmans.jpg"
import bg_image4 from "../images/spray.png"

const Home=(props)=>{

    //const [loggedIn, setLoggedIn] = useState(false)

    function handleLogout(){
        if(window.confirm("Ready to log out?")){
            props.appLogout();
        }

    }

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
                    <div className="home-section-label">Virtual Helicopter Operations Group</div>
                    <div className="home-section-content">
                        <p>
                        Virtual Helicopter Operations Group (VHOG) began as an idea in 2023 from a group of friends who share 
                        a passion
                        for aviation and flight simulation, and helicopter operations in particular. Most of us here have many
                        thousands of hours of flight time in large jets and turbprops, and belong to other virtual airlines 
                        that cater to structured flight operations, revenue, landing rates, and other metrics. VHOG is tailored
                        specficially to helicopter operations in MSFS and X-Plane.
                        </p>

                        <div className="joinlink">
                            {!props.loggedIn && <div className="joinus">Not a member? 👉 <a href='/joinform'>Click here to join us! </a></div>}
                        </div>
                        


                    </div>

                </div>

                <div className="home-section">
                    <div className="home-section-label">OPERATIONS</div>
                        <div className="home-section-content">
                            <div className="menu">
                                {/* <Link to='/recentflights'><button className="menu-item">Stats</button></Link>
                                <Link to='/flyingnow'><button className="menu-item">Flying Now</button></Link>
                                <Link to='/pilotstories'><button className="menu-item">Join Us</button></Link> */}
                                {props.loggedIn && <Link to='/userhome'><button className="menu-item">My Dashboard</button></Link>}
                                {!props.loggedIn && <Link to='/login'><button className="menu-item">Login</button></Link>}
                                {/* <Link to='/roadmap'><button className="menu-item">System Stats</button></Link>
                                <Link to='/roadmap'><button className="menu-item">Flight Map</button></Link>
                                <Link to='/roadmap'><button className="menu-item">Tours</button></Link>
                                <Link to='/roadmap'><button className="menu-item">Missions</button></Link> */}
                                <Link to='/roadmap'><button className="menu-item">Roadmap</button></Link>
                                {props.loggedIn &&  <Link to='/recentflights'><button className="menu-item">Recent Flights</button></Link>}
                            </div>
                        </div>

                        <div className="home-section-label">MEMBERS ONLY</div>
                        <div className="home-section-content">
                            <div className="menu">
                                {/* <Link to='/recentflights'><button className="menu-item">Stats</button></Link>
                                <Link to='/flyingnow'><button className="menu-item">Flying Now</button></Link>
                                <Link to='/pilotstories'><button className="menu-item">Join Us</button></Link> */}
                                {props.loggedIn && <Link to='/dailyflight'><button className="menu-item">Daily Flight</button></Link>}
                                {props.loggedIn && <Link to='/acars'><button className="menu-item">Acars</button></Link>}
                                {props.loggedIn && <Link to='/discord'><button className="menu-item">Discord</button></Link>}
                                {props.loggedIn && <Link to='/'><button onClick={handleLogout} className="menu-item">Logout</button></Link>}
                                
                                {/* <Link to='/roadmap'><button className="menu-item">System Stats</button></Link>
                                <Link to='/roadmap'><button className="menu-item">Flight Map</button></Link>
                                <Link to='/roadmap'><button className="menu-item">Tours</button></Link>
                                <Link to='/roadmap'><button className="menu-item">Missions</button></Link> */}
                                
                            </div>
                        </div>


                </div>

            </div>
        </React.Fragment>
    )
}
export default Home;