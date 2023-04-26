import React from "react";
import {Link} from 'react-router-dom'

import Header from "../components/Header"

const UserHome=(props)=>{

    console.log(props)

    return(
        <React.Fragment>
            
            <Header />
            <div className="userhome">
                
                <div className="userhome-topline">
                    <h2>{props.callsign} - {props.fullname}</h2>
                </div>

                <div className="userhome-content">
                    <div className="userhome-upper">
                        <div className="userhome-upper-block">
                            <h1>2 FLIGHTS</h1>
                        </div>
                        <div className="userhome-upper-block">
                            <h1>4.5 HOURS</h1>
                        </div>                        
                        <div className="userhome-upper-block">
                            <h1>577 MILES</h1>
                        </div>
                    </div>

                    <div className="userhome-lower">
This is where the logbook will be
                    </div>

                </div>



            </div>
        </React.Fragment>
    )
}
export default UserHome;