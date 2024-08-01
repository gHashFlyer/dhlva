import React, {useEffect, useState} from "react";
import { Link, Routes, Route, useNavigate, resolvePath } from "react-router-dom";

import axios from "axios";

import Header from "../components/Header"

const UserLogbook=(props)=>{

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
            .post("https://vhog.net/api/get_user_logbook.php",JSON.stringify(postData))
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

    function handleClick(e){
        e.preventDefault();
        console.log(e.currentTarget.id);
        navigate("/user_log_detail/" + e.currentTarget.id);
    }

    return(
        <React.Fragment>
            
            <div className="userhome-header">
                <div className="userhome-header-menu">
                    {/* <Link to='/'><button className="userhome-header-menu-item">Home</button></Link> */}
                    <Link to='/userhome'><button className="userhome-header-menu-item">Dashboard</button></Link>
                    {respData && respData.staff && respData.staff === 'CEO'? 
                        <div>
                        <Link to='/admin_user_apps'><button className="header-menu-item">Admin User Apps</button></Link>
                        <Link to='/admin_pireps'><button className="header-menu-item">Admin Pireps</button></Link>
                        </div>                        
                    :""}


                </div>
            </div>

            <div className="userhome">
                
                <div className="userhome-topline">
                    <h2>{props.callsign} - {props.fullname}</h2>
                </div>

                <div className="userhome-content">
                
                    
                    <div className="userhome-upper">
                        My Flights
                    </div>

                    
                    <div className="userhome-lower">

                        <table className="blueTable">
                            <tr>
                                <th>🧐</th><th>Date</th><th>Aircraft</th><th>Depart</th><th>Arrive</th><th className="blueTable-td-right">Time</th><th className="blueTable-td-right">NM</th><th>Status</th>
                            </tr>
                            {respData && respData.logbook.map((x)=>

                                <tr>
                                    <td className="button-user-logbook" id={x.id} onClick={handleClick}>⊞</td>
                                    <td>{x.fdate}</td>
                                    <td>{x.aircraft}</td>
                                    <td>{x.orig}</td>
                                    <td>{x.dest}</td>
                                    <td className="blueTable-td-right">{x.enrtime}</td>
                                    <td className="blueTable-td-right">{x.nm}</td>
                                    <td>{x.status}</td>
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
export default UserLogbook;