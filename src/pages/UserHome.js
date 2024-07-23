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
                    {respData && respData.staff && respData.staff === 'CEO'? 

                        <Link to='/admin_user_apps'><button className="header-menu-item">Admin User Apps</button></Link>
                    
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
                        
                        <div className="userhome-upper-block">
                            <h1>{respData && respData.summary.flights} FLIGHTS</h1>
                        </div>
                        <div className="userhome-upper-block">
                            <h1>{respData && respData.summary.hours} HOURS</h1>
                        </div>                        
                        <div className="userhome-upper-block">
                            <h1>{respData && respData.summary.nm} MILES</h1>
                        </div>
                    </div>

                    <div className="userhome-lower">
                        <table className="blueTable">
                            <tr>
                                {/* <th>Date</th><th>Depart</th><th>Arrive</th><th>Aircraft</th><th className="blueTable-td-right">Time</th><th className="blueTable-td-right">NM</th> */}
                                <th>Date</th><th>Aircraft</th><th className="blueTable-td-right">Time</th><th className="blueTable-td-right">NM</th>
                            </tr>
                            {respData && respData.logbook.map((x)=>

                                <tr>
                                <td>{x.fdate}</td>
                                {/* <td>{x.oapt}</td>
                                <td>{x.dapt}</td> */}
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
export default UserHome;