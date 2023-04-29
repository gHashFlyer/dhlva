import React, {useEffect, useState} from "react";
import { Link, Routes, Route, useNavigate, resolvePath } from "react-router-dom";

import axios from "axios";

import Header from "../components/Header"

const PilotStories=(props)=>{

    const navigate = useNavigate()

    const [respData, setRespData] = useState(false)


    const randx = Math.random();

      // Get user data if there is a request
      useEffect(() => {

        axios
        .get("https://extrafly.net/api/get_pilotstories.php?r=" + randx)
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
      }, []);



    return(
        <React.Fragment>
            
            <div className="userhome">
                <Header title={"Pilot Stories"}/>

                <div className="userhome-content">
                    <div className="userhome-lower">
                        <table className="blueTable">
                            <tr>
                                <th>Date Time</th><th>Flight</th><th>Aircraft</th><th>Pilot Report</th>
                                
                            </tr>
                            {respData && respData.logbook.map((x)=>

                                <tr>
                                <td>{x.fdate}</td>
                                <td>{x.user}</td>
                                <td>{x.aircraft}</td>
                                <td>{x.pirep}</td>

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
export default PilotStories;