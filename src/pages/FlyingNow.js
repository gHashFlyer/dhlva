import React, {useEffect, useState} from "react";
import { Link, Routes, Route, useNavigate, resolvePath } from "react-router-dom";

import axios from "axios";

import Header from "../components/Header"

const FlyingNow=(props)=>{

    const navigate = useNavigate()

    const [refresh, setRefresh] = useState();
    const [respData, setRespData] = useState(false)


    const randx = Math.random();

      // Get user data if there is a request
      useEffect(() => {

        axios
        .get("https://extrafly.net/api/get_inflight.php?r=" + randx)
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
        //console.log("get data")

        return () => {};
      }, [refresh]);

      useEffect(() => {
        const interval = setInterval(() => {
            //console.log(Math.random())
            setRefresh(Math.random())
        }, 12000)
      
        return () => 
            clearInterval(interval)   
        
      }, [])
      




    return(
        <React.Fragment>
            
            <div className="userhome">
                <Header title={"Flying Now"}/>

                <div className="userhome-content">
                    <div className="userhome-lower">
                        <table className="blueTable">
                            <tr>
                                <th>Date Time</th><th>Flight</th><th>Aircraft</th><th>Time</th><th>Altitude</th><th>Hdg</th><th>Speed</th><th>On Ground</th>
                                
                            </tr>
                            {respData && respData.inflight.map((x)=>

                                <tr>
                                <td>{x.fdate}</td>
                                <td>{x.user}</td>
                                <td>{x.aircraft}</td>
                                <td>{x.etime}</td>
                                <td>{x.msl}</td>
                                <td>{x.hdg}</td>
                                <td>{x.gskts}</td>
                                <td>{x.onground}</td>
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
export default FlyingNow;