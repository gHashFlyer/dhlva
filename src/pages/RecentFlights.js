import React, {useEffect, useState} from "react";
import { Link, Routes, Route, useNavigate, resolvePath } from "react-router-dom";

import axios from "axios";

import Header from "../components/Header"

const RecentFlights=(props)=>{

    const navigate = useNavigate()

    const [respData, setRespData] = useState(false)

    const randx = Math.random();

      // Get user data if there is a request
      useEffect(() => {

        axios
        .get("https://vhog.net/api/get_recentflights.php?r=" + randx)
        .then((response)=>{
            setRespData(response.data)
            if(response.data){
                console.log(response.data)
            }else{
                console.log("...")
            }
        })
        .catch(error=> {
            console.log("axios error")
        })        
        console.log("get data")

        return () => {};
      }, []);


    return(
        <React.Fragment>
            
            {/* <Header appLogout = {props.appLogout}/> */}
            <div className="userhome">
            <div className="home-section-label">
                        <Link to='/'><button className="header-menu-item">back</button></Link> 
                    </div>                    
                <Header title={"Recent Flights"}/>
                {/* <div className="userhome-topline">
                </div> */}

                <div className="userhome-content">
                    {/* <div className="userhome-upper">
                    </div> */}

                    <div className="userhome-lower">
                        <table className="blueTable">
                            <tr>
                                <th>Date</th><th>Member</th><th>Depart</th><th>Arrive</th><th>Aircraft</th><th className="blueTable-td-right">Time</th><th className="blueTable-td-right">NM</th>
                            </tr>
                            {respData && respData.logbook.map((x)=>

                                <tr>
                                <td>{x.fdate}</td>
                                <td>{x.user}</td>
                                <td>{x.oapt}</td>
                                <td>{x.dapt}</td>
                                <td>{x.aircraft}</td>
                                <td className="blueTable-td-right">{x.enrtime}</td>
                                <td className="blueTable-td-right">{x.nm}</td>
                                </tr>

                                )
                            }

                        </table>

                    </div>

                </div>



            </div>
        </React.Fragment>
    )
}
export default RecentFlights;