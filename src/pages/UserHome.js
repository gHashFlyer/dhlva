import React, {useEffect, useState} from "react";
import { Link, Routes, Route, useNavigate, resolvePath } from "react-router-dom";

import axios from "axios";

import Header from "../components/Header"

const UserHome=(props)=>{

    const navigate = useNavigate()

    const [callsign, setCallsign] = useState(false)
    const [postData, setPostData] = useState(false)
    const [respData, setRespData] = useState(false)

    // console.log(props)

    // Identify user and initate request for more data
    useEffect(() => {
        if(!callsign){
            console.log("check local storage")
            const cs = localStorage.getItem("callsign");
            const au = localStorage.getItem("userauth");
            if(cs === null || au === null){
                navigate('/',{replace:true})
            }else{
                console.log("set postParams")
                const postParams = { "callsign": cs, "auth": au };
                setPostData(postParams);
            }
        }
        return () => {};
    }, []);

      // Get user data if there is a request
      useEffect(() => {
        if(postData){
            axios
            .post("https://extrafly.net/api/get_userhome.php",JSON.stringify(postData))
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
            setPostData(false)
        }


        return () => {};
      }, [postData]);      


    return(
        <React.Fragment>
            
            <Header appLogout = {props.appLogout}/>
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
                                <th>Date</th><th>Orig-Dest</th><th>Depart</th><th>Arrive</th><th>Aircraft</th><th className="blueTable-td-right">Time</th><th className="blueTable-td-right">NM</th><th>Pirep</th>
                            </tr>
                            {respData && respData.logbook.map((x)=>

                                <tr>
                                <td>{x.fdate}</td>
                                <td>{x.orig}-{x.dest}</td>
                                <td>{x.oapt}</td>
                                <td>{x.dapt}</td>
                                <td>{x.aircraft}</td>
                                <td className="blueTable-td-right">{x.enrtime}</td>
                                <td className="blueTable-td-right">{x.nm}</td>
                                <td className="blueTable-td-pirep">{x.pirep}</td>
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