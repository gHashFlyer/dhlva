import React, {useEffect, useState} from "react";
import { Link, Routes, Route, useNavigate, resolvePath } from "react-router-dom";

import axios from "axios";

import Header from "../components/Header"

const UserHome=(props)=>{

    const navigate = useNavigate()

    const [callsign, setCallsign] = useState(false)
    const [postData, setPostData] = useState(false)
    const [respData, setRespData] = useState(false)

    const [staff, setStaff] = useState(false)

    // console.log(props)

    // Identify user and initate request for more data
    useEffect(() => {
        if(!callsign){
            console.log("check local storage")
            const cs = localStorage.getItem("callsign");
            const au = localStorage.getItem("auth");
            if(cs === null || au === null){
                navigate('/',{replace:true})
            }else{
                console.log("set postParams")
                const postParams = { "callsign": cs, "auth": au };
                setCallsign(cs);
                setPostData(postParams);
            }
        }
        return () => {};
    }, []);

    // Get user data if there is a request
    useEffect(() => {
        if(postData){
            axios
            .post("https://vhog.net/api/get_userhome.php",JSON.stringify(postData))
            .then((response)=>{
                setRespData(response.data)
                if(response.data){
                    console.log(response.data)
                    if(response.data.staff){
                        setStaff(response.data.staff)
                        console.log(response.data.staff)
                    }
                }else{
                    console.log("...")
                }
            })
            .catch(error=> {
                console.log("axios error")
            })        
            setPostData(false)
        }

        return () => {};
      }, [postData]);      

      function handleLogout(){
        props.appLogout();
    }

    return(
        <React.Fragment>
            
            <div className="userhome-header">
                <div className="userhome-header-menu">
                    <Link to='/'><button className="userhome-header-menu-item">Home</button></Link>
                    <Link to='/userhome'><button className="userhome-header-menu-item">Dashboard</button></Link>                    
                    <Link to='/userlogbook'><button className="userhome-header-menu-item">Logbook</button></Link>
                    {respData && respData.staff && respData.staff === 'CEO'? 
                        <div>
                        <Link to='/admin_user_apps'><button className="header-menu-item">Admin User Apps</button></Link>
                        <Link to='/admin_pireps'><button className="header-menu-item">Admin Pireps</button></Link>
                        </div>                        
                    
                    :""}

                    <Link to='/'><button onClick={handleLogout} className="userhome-header-menu-item">Logout</button></Link>                
                    {/* <Link to='/'><button className="header-menu-item">Home</button></Link>
                    <Link to='/'><button className="header-menu-item">Home</button></Link>
                    <Link to='/'><button className="header-menu-item">Home</button></Link> */}
                </div>
            </div>

            <div className="userhome">
                
                <div className="userhome-topline">
                    <h2>{props.callsign} - {props.fullname}</h2>
                </div>

                <div className="userhome-content">
                
                    
                    <div className="userhome-upper">
                        
                    <div className="userhome-header">Career Summary</div>
                        {respData.summary &&
                        <table className="userhome-stats-table">
                            <thead>
                                <tr>
                                    <th>Flights</th>
                                    <th>Distance</th>
                                    <th>Time</th>


                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <table className="userhome-stats-table">
                                            <tr><td>Total Approved Flights</td><td>{respData.summary.total_flights}</td></tr>
                                            <tr><td>Airports</td><td>{respData.summary.ap_flights}</td></tr>
                                            <tr><td>Hospitals</td><td>{respData.summary.hhp_flights}</td></tr>
                                            <tr><td>Heliports</td><td>{respData.summary.hp_flights}</td></tr>
                                        </table>
                                    </td>
                                    <td>
                                        <table className="blueTable">
                                            <tr><td>Total Direct Miles</td><td>{respData.summary.total_directnm}</td></tr>
                                            <tr><td>Average per Flight</td><td>{respData.summary.average_directnm}</td></tr>
                                            <tr><td>Total Actual Miles</td><td>{respData.summary.total_actualnm}</td></tr>
                                            <tr><td>Average per Flight</td><td>{respData.summary.average_actualnm}</td></tr>
                                        </table>
                                    </td>
                                    <td>
                                        <table className="blueTable">
                                            <tr><td>Total Block Hours</td><td>{respData.summary.total_blocktime}</td></tr>
                                            <tr><td>Average per Flight</td><td>{respData.summary.average_blocktime}</td></tr>
                                            <tr><td>Time Aloft Hours</td><td>{respData.summary.total_alofttime}</td></tr>
                                            <tr><td>Average per Flight</td><td>{respData.summary.average_alofttime}</td></tr>
                                        </table>
                                    </td>                                    
                        
                                </tr>
                            </tbody>

                        </table>
                        }


                        {respData.summary &&
                        <table className="userhome-stats-table">
                            <thead>
                                <tr>

                                    <th>Hover</th>
                                    <th>Skids</th>
                                    <th>Misc</th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <table className="userhome-stats-table">
                                            <tr><td>Total Hover Hours</td><td>{respData.summary.total_hover}</td></tr>
                                            <tr><td>Precision Hover</td><td>{respData.summary.hover1}</td></tr>
                                            <tr><td>Commercial Hover</td><td>{respData.summary.hover2}</td></tr>
                                            <tr><td>General Hover</td><td>{respData.summary.hover3}</td></tr>
                                        </table>
                                    </td>
                                    <td>
                                        <table className="blueTable">
                                            <tr><td>Total Skids</td><td>{respData.summary.total_skids}</td></tr>
                                            <tr><td>Average per Flight</td><td>{respData.summary.average_skids}</td></tr>
                                            <tr><td>Average FPM</td><td>{respData.summary.average_fpm}</td></tr>
                                            <tr><td>StdDev FPM</td><td>{respData.summary.stdev_fpm}</td></tr>
                                            
                                        </table>
                                    </td>
                                    <td>
                                        <table className="blueTable">
                                            <tr><td>Total Fuel</td><td>{respData.summary.total_fuel}</td></tr>
                                            <tr><td>Total Payload</td><td>{respData.summary.total_payload}</td></tr>
                                            <tr><td>Unique Liveries</td><td>{respData.summary.unique_eqpt}</td></tr>
                                            <tr><td>Avg TISA (minutes)</td><td>{respData.summary.average_tisa}</td></tr>
                                        </table>
                                    </td>                                    
                                </tr>
                            </tbody>

                        </table>
                        }

                    </div>

                    
                    <div className="userhome-lower">
                    <div className="">YOUR RECENT FLIGHTS</div>
                        <table className="blueTable">
                            <tr>
                                {/* <th>Date</th><th>Depart</th><th>Arrive</th><th>Aircraft</th><th className="blueTable-td-right">Time</th><th className="blueTable-td-right">NM</th> */}
                                <th>Date</th><th>Aircraft</th><th>Depart</th><th>Arrive</th><th className="blueTable-td-right">Time</th><th className="blueTable-td-right">NM</th>
                            </tr>
                            {respData && respData.logbook.map((x)=>

                                <tr>
                                <td>{x.fdate}</td>
                                <td>{x.aircraft}</td>
                                <td>{x.orig}</td>
                                <td>{x.dest}</td>
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
export default UserHome;