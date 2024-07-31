import React, {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

import Header from "../components/Header"

const AdminPireps=(props)=>{

    const navigate = useNavigate()

    const [postData, setPostData] = useState(false)
    const [respData, setRespData] = useState(false)

    const [formData, setFormData] = useState(false)

    

    const randx = Math.random();



    // Identify user and initate request for more data
    useEffect(() => {
        const cs = localStorage.getItem("callsign");
        const au = localStorage.getItem("auth");
        if(cs === null || au === null){
            navigate('/',{replace:true})
        }else{
            const obj = { "callsign": cs, "auth": au };
            setPostData(obj);
        }
        return () => {};
    }, [navigate]);    


    // Get pending pireps
    useEffect(() => {
        if(postData){
            axios
            .post("https://vhog.net/api/get_pending_pireps.php",JSON.stringify(postData))
            .then((response)=>{
                
                if(response.data){
                    console.log(response.data.pireps)
                    setRespData(response.data.pireps)

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


    // Post form data - to: approve or reject
    useEffect(() => {
        if(formData){
            axios
            .post("https://vhog.net/api/admin_pirep.php",JSON.stringify(formData))
            .then((response)=>{
                if(response.data){
                    console.log(response.data)
                }else{
                    console.log("no response")
                }
            })
            .catch(error=> {
                console.log("axios error")
            })        
            setPostData(false)
        }
        return () => {};
    }, [formData]);          


    let pirepsPending
    let numPireps = 0
    if(respData){
        pirepsPending = respData.filter(function(el){ return el.status==='pending'});
        numPireps = pirepsPending.length
    }    


    const handleAprRej = (e,buttonAction) => {
        e.preventDefault()

        // Submit the form data to the server
        const obj = {"id":e.currentTarget.id, "action":buttonAction}
        setFormData(obj)

        // Remove the pirep from the display
        let newData = respData.filter(item => item.id !== e.currentTarget.id)
        console.log(newData)
        setRespData(newData)

    }

    return(
        <React.Fragment>
            
            <div className="userhome">
                <Header title={`Pending Pireps (` + numPireps + `) ` + randx}/>

                <div className="userhome-content">
                    <div className="userhome-lower">
                        <div className="newapps-group-label">Pending</div>
                        <table className="blueTable">
                            <tr>
                                <th>date</th><th>user</th><th>aircraft</th><th>orig</th><th>dest</th><th>fuel</th><th>ps|wp|sl|st|sr|rf</th>
                            </tr>
                            {pirepsPending  && pirepsPending.map((x)=>
                                <tr key={x.id}>
                                    <td>{x.entrydate}</td>
                                    <td>{x.user}</td>
                                    <td>{x.aircraft}</td>
                                    <td>{x.orig}</td>
                                    <td>{x.dest}</td>
                                    <td>{x.fuel}</td>
                                    <td>{x.flags}</td>
                                    <td className="button-group">
                                        <button id={x.id} onClick={(e)=>handleAprRej(e,'approved')} className="button-qza">APR</button>
                                        <button id={x.id} onClick={(e)=>handleAprRej(e,'rejected')} className="button-qza">REJ</button>
                                        <Link to={`/admin_pirep_info/` + x.id}><button className="button-qza">INF</button></Link> 
                                    </td>
                                </tr>
                                )
                            }

                        </table>
                    </div>

                    {/* <div className="userhome-lower">
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
                    </div>                     */}

                </div>



            </div>
        </React.Fragment>
    )
}
export default AdminPireps;