import React from "react";
import {Link} from 'react-router-dom'


const About=()=>{


    return(
        <React.Fragment>
            <div className="home">

                <div className="home-section">
                    <div className="home-section-label">
                        <Link to='/'><button className="header-menu-item">back</button></Link> 
                    </div>                    
                    <div className="home-section-label">
                        Road Map
                    </div>
                    <div className="home-section-content">
                    We have plans to add many new features to this website.     
                        <ol>
                        
                            <li className="finished">☑ Custom ACARS. Our custom helicopter acars makes flight reporting super duper simple!</li>
                            <li className="finished">☑ Discord Server. Have an idea? Members can discuss future plans, and share screenshots and videos.</li>
                            <li className="finished">☑ Comprehensive Flight Stats.  Time aloft, landing, hovering, distance, flights to heliports, hospitals, airports, and off-field operations.</li>
                            <li className="finished">☑ Daily Flights - every day a new adventure.  These are direct delivery flights, where you start at one location and fly to another location.</li>
                            <li>☐ Flight Tracking - flight history and real-time monitoring. We already collect the data - implementation is next!</li>
                            <li>☐ Missions - specific goals to achieve success.  Missions will include operations to support photography, tourism, news and traffic loitering, cartography, powerline inspection, law enforcement, oil rig platforms, and many more.</li>
                            <li>☐ Tours - custom travel plans.  Tours span across multiple locations. Some tours are time-limited, others will be permanent fixtures.</li>
                            <li>☐ Awards - get recognized for what you do best.  These include achievements for completing training criteria, hovering precision, landing performance, among others.</li>

                            <li>☐ Group Flights - you're part of a community.  Group flights encouraged; events will be planned.</li>
                        </ol>
                            


                        Have an idea?  Members have access to our Discord server and can share ideas, screenshots and videos.
                    </div>


                </div>

            </div>
        </React.Fragment>
    )
}
export default About;