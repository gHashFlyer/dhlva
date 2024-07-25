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





    let usersVerified
    if(respData.users){
        console.log(respData)
        usersVerified = respData.users.filter(function(el){ return el.status=='verified'});
    }
    let usersPending
    if(respData.users){
        console.log(respData)
        usersPending = respData.users.filter(function(el){ return el.status=='pending'});
    }    
    let usersApproved
    if(respData.users){
        console.log(respData)
        usersApproved = respData.users.filter(function(el){ return el.status=='approved'});
    }    
    let usersRejected
    if(respData.users){
        console.log(respData)
        usersRejected = respData.users.filter(function(el){ return el.status=='rejected'});
    }    

    



    return(
        <React.Fragment>
            
            <div className="userhome">
                <Header title={"New Users"}/>

                <div className="userhome-content">
                    <div className="userhome-lower">
                        <div className="newapps-group-label">Verified</div>
                        <table className="blueTable">
                            <tr>
                                <th>Date Time</th><th>First Name</th><th>Last Name</th><th>Email</th><th>Comments</th><th>Status</th><th>Action</th>
                            </tr>
                            {usersVerified  && usersVerified.map((x)=>
                                <tr key={x.id}>
                                    <td>{x.appdate}</td>
                                    <td>{x.firstname}</td>
                                    <td>{x.lastname}</td>
                                    <td>{x.email}</td>
                                    <td>{x.comments}</td>
                                    <td>{x.status}</td>
                                    <td>
                                        <Link to={`/admin_user_new/` + x.id}><button className="menu-item">Manage {x.id}</button></Link> 
                                    </td>
                                </tr>
                                )
                            }

                        </table>
                    </div>

                    <div className="userhome-lower">
                        <div className="newapps-group-label">Pending</div>
                        <table className="blueTable">
                            <tr>
                                <th>Date Time</th><th>First Name</th><th>Last Name</th><th>Email</th><th>Comments</th><th>Status</th><th>Action</th>
                            </tr>
                            {usersPending  && usersPending.map((x)=>
                                <tr key={x.id}>
                                    <td>{x.appdate}</td>
                                    <td>{x.firstname}</td>
                                    <td>{x.lastname}</td>
                                    <td>{x.email}</td>
                                    <td>{x.comments}</td>
                                    <td>{x.status}</td>
                                    <td>
                                        <Link to={`/admin_user_new/` + x.id}><button className="menu-item">Manage {x.id}</button></Link> 
                                    </td>
                                </tr>
                                )
                            }

                        </table>
                    </div>

                    <div className="userhome-lower">
                        <div className="newapps-group-label">Approved</div>
                        <table className="blueTable">
                            <tr>
                                <th>Date Time</th><th>First Name</th><th>Last Name</th><th>Email</th><th>Comments</th><th>Status</th><th>Action</th>
                            </tr>
                            {usersApproved  && usersApproved.map((x)=>
                                <tr key={x.id}>
                                    <td>{x.appdate}</td>
                                    <td>{x.firstname}</td>
                                    <td>{x.lastname}</td>
                                    <td>{x.email}</td>
                                    <td>{x.comments}</td>
                                    <td>{x.status}</td>
                                    <td>
                                        <Link to={`/admin_user_new/` + x.id}><button className="menu-item">Manage {x.id}</button></Link> 
                                    </td>
                                </tr>
                                )
                            }

                        </table>
                    </div>
                    <div className="userhome-lower">
                        <div className="newapps-group-label">Rejected</div>
                        <table className="blueTable">
                            <tr>
                                <th>Date Time</th><th>First Name</th><th>Last Name</th><th>Email</th><th>Comments</th><th>Status</th><th>Action</th>
                            </tr>
                            {usersRejected  && usersRejected.map((x)=>
                                <tr key={x.id}>
                                    <td>{x.appdate}</td>
                                    <td>{x.firstname}</td>
                                    <td>{x.lastname}</td>
                                    <td>{x.email}</td>
                                    <td>{x.comments}</td>
                                    <td>{x.status}</td>
                                    <td>
                                        <Link to={`/admin_user_new/` + x.id}><button className="menu-item">Manage {x.id}</button></Link> 
                                    </td>
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