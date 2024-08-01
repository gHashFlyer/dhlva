import React from "react";
import {Link} from 'react-router-dom'


const Discord=()=>{


    return(
        <React.Fragment>
            <div className="home">

                <div className="home-section">
                    <div className="home-section-label">
                        <Link to='/'><button className="header-menu-item">back</button></Link> 
                    </div>                    
                    <div className="home-section-label">
                    Join us on Discord!
                    </div>
                    <div className="home-section">
                        <br />
                        <div>Invite Code: PMbUR87nMP</div>
                        <br /><hr />
                        <div>
                            Discord is a free voice and text chat app that you access with a browser, 
                            or you can use the Discord App on your PC or mobile device. We want you to
                            join us! Simply click on the following invite link, and use your first name and
                            callsign, such as: 'John - VHG987'.
                        </div>

                        <br /><br />
                        <div><a href="https://discord.gg/PMbUR87nMP">Invite Link</a></div>

                    </div>


                </div>

            </div>
        </React.Fragment>
    )
}
export default Discord;