import React from "react";

import bg_image from "../images/bgimage.png"

const Home=()=>{
    return(
        <React.Fragment>
            <div className="home">
                
                <div className="home-banner">
                    <div className="home-banner-a">
                        <img src={bg_image} />
                    </div>
                    <div className="home-banner-b">b</div>
                    <div className="home-banner-c">c</div>
                    {/* <img src={bg_image} />
                    <img src={bg_image} />
                    <img src={bg_image} /> */}
                </div>

                <div className="home-section">
                    <div className="home-section-label">ABOUT US</div>
                    <div className="home-section-content">
                        <p>
                        ExtraFly Virtual Aviation began as an idea in 2023 from a group of friends who share a passion
                        for aviation and flight simulation, and helicopter operations in particular. Most of us here have many
                        thousands of hours of flight time in large jets and turbprops, and belong to other virtual airlines 
                        that cater to structured flight operations, revenue, landing rates, and other metrics. Here at ExtraFly
                        we have fun flying together using a mixed variety of aircraft using X-Plane, MSFS 2020, FSX, P3D, and FS9.
                        </p>

                        <p>
                        Currently, membership is by invitation only. We may have open slots for general
                        membership in the future. You can add your name to the waiting list.
                        </p>

                    </div>

                </div>

                <div className="home-section">
                    <div className="home-section-label">OPERATIONS</div>
                    <div className="home-section-content">
                        <p>
                        
                        </p>
                        <div className="menu">
                            <li><a href='#'>Recent Flights</a></li>
                            <li>Who's Flying Now</li>
                            <li>Stories from Afield</li>
                            <li>Login</li>
                        </div>
                    </div>

                </div>

            </div>
        </React.Fragment>
    )
}
export default Home;