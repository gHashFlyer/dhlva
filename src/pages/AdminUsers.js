import React, {useEffect, useState} from "react";
import { Link, Routes, Route, useNavigate, resolvePath } from "react-router-dom";

import axios from "axios";

import Header from "../components/Header"

const AdminUsers=(props)=>{

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
            .post("https://vhog.net/api/get_users.php",JSON.stringify(postData))
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

    let users
    if(respData.users){
        console.log(respData.users)
        //usersVerified = respData.users.filter(function(el){ return el.status==='verified'});
        users = respData.users
    }

    return(
        <React.Fragment>
            
            <div className="userhome">
                <div className="userhome-content">
                <div className="home-section-label">
                    <Link to='/userhome' className="backbutton">&laquo; return</Link> 
                    </div>                                        
                    <div className="userhome-lower">
                        <div className="newapps-group-label">Users</div>
                        <table className="blueTable">
                            <tr>
                                <th>id</th><th>Joined</th><th>First Name</th><th>Last Name</th><th>Email</th><th>Callsign</th><th>Staff</th><th>Action</th>
                            </tr>
                            {users  && users.map((x)=>
                                <tr key={x.id}>
                                    <td>{x.id}</td>
                                    <td>{x.joindate}</td>
                                    <td>{x.firstname}</td>
                                    <td>{x.lastname}</td>
                                    <td>{x.email}</td>
                                    <td>{x.callsign}</td>
                                    <td>{x.staff}</td>
                                    <td>
                                        <Link to={`/adminusers_edit/` + x.id}><button className="menu-item">⬲</button></Link>
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
export default AdminUsers;