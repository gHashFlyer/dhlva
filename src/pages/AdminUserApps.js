import React, {useEffect, useState} from "react";
import { Link, Routes, Route, useNavigate, resolvePath } from "react-router-dom";

import axios from "axios";

import Header from "../components/Header"

const AdminUserApps=(props)=>{

    const navigate = useNavigate()


    const [callsign, setCallsign] = useState(false)
    const [postData, setPostData] = useState(false)
    const [respData, setRespData] = useState(false)

    const randx = Math.random();

    // Identify user and initate request for more data
    useEffect(() => {
        if(!callsign){
            console.log("get callsign and auth from local storage")
            const cs = localStorage.getItem("callsign");
            const au = localStorage.getItem("auth");
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
            .post("https://vhog.net/api/get_newapps.php",JSON.stringify(postData))
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
            setPostData(false)
        }

        return () => {};
      }, [postData]);      

      function handleLogout(){
        props.appLogout();
    }


    // Verify user has access to this page.



    return(
        <React.Fragment>
            
            <div className="userhome">
                <Header title={"New Users"}/>

                <div className="userhome-content">
                    <div className="userhome-lower">
                        <table className="blueTable">
                            <tr>
                                <th>Date Time</th><th>First Name</th><th>Last Name</th><th>Email</th><th>Comments</th><th>Status</th>
                                
                            </tr>
                            {respData && respData.users.map((x)=>

                                <tr>
                                    <td>{x.appdate}</td>
                                    <td>{x.firstname}</td>
                                    <td>{x.lastname}</td>
                                    <td>{x.email}</td>
                                    <td>{x.comments}</td>
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
export default AdminUserApps;