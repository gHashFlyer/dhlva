import React, { useEffect, useState } from "react";
import {
  Link,
  useParams,
  Routes,
  Route,
  useNavigate,
  resolvePath,
} from "react-router-dom";

import axios from "axios";

import Header from "../components/Header";


const AdminUserNew = (props) => {
  const navigate = useNavigate();
  const params = useParams();

  const [callsign, setCallsign] = useState(false);
  const [postData, setPostData] = useState(false);
  const [respData, setRespData] = useState(false);

  const [formData, setFormData] = useState(false);
  const [formResponse, setFormResponse] = useState(false);

  const randx = Math.random();

  // Identify user and initate request for more data
  useEffect(() => {
    if (!callsign) {

      const cs = localStorage.getItem("callsign");
      const au = localStorage.getItem("auth");
      if (cs === null || au === null) {
        navigate("/", { replace: true });
      } else {
        const postParams = { callsign: cs, auth: au, id: params.id };
        setPostData(postParams);
      }
    }
    return () => {};
  }, []);

  // Get the users who have signed up but are not members yet
  useEffect(() => {
    if (postData) {
      axios
        .post(
          "https://vhog.net/api/get_newapps_user.php",
          JSON.stringify(postData)
        )
        .then((response) => {
          response.data.mesg = response.data.mesg.replaceAll('#','\n')

          setRespData(response.data);
          if (response.data) {
            console.log(response.data);
          } else {
            console.log("...");
          }
        })
        .catch((error) => {
          console.log("axios error");
        });
      setPostData(false);
    }

    return () => {};
  }, [postData]);



  // Get data if there is a request
  useEffect(() => {
    if (postData) {
      axios
        .post(
          "https://vhog.net/api/get_newapps_user.php",
          JSON.stringify(postData)
        )
        .then((response) => {
          response.data.mesg = response.data.mesg.replaceAll('#','\n')

          setRespData(response.data);
          if (response.data) {
            console.log(response.data);
          } else {
            console.log("...");
          }
        })
        .catch((error) => {
          console.log("axios error");
        });
      setPostData(false);
    }

    return () => {};
  }, [postData]);


  // Submit formData to server and get forResponse (looking for 'OK')
  useEffect(() => {
    if (formData) {
      axios
        .post(
          "https://vhog.net/api/admin_new_user.php",
          JSON.stringify(formData)
        )
        .then((response) => {

          
          if (response.data) {
            console.log(response.data);
            setFormResponse(response.data);
            navigate("/admin_user_apps", { replace: true });
          } else {
            console.log("...");
          }
        })
        .catch((error) => {
          console.log("axios error");
        });
      setFormData(false);
    }

    return () => {};
  }, [formData]);  

  function handle_NewUserForm(e) {
    e.preventDefault()
    let callsign = localStorage.getItem("callsign");
    let auth = localStorage.getItem("auth");
    
    let rowid = e.target.rowid.value;
    let action = e.target.action.value;
    let message = e.target.message.value;
    let newcall =  e.target.newcall.value;
    let newpass =  e.target.newpass.value;
    console.log(action);


    const params = {
      callsign: callsign,
      auth: auth,
      rowid:  rowid,
      action: action,
      newcall: newcall,
      newpass: newpass,
      mesg: message,
    };

    console.log(params)
    setFormData(params)
    
  }

  return (
    <React.Fragment>
      <div className="userhome">
        <Header title={`Admin New User: rowid=` + params.id} />

        <div className="userhome-content">
          <div className="userhome-lower">
            <table className="blueTable">
              <tr>
                <th>Date Time</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Status</th>
              </tr>
              <tr>
                <td>{respData.appdate}</td>
                <td>{respData.firstname}</td>
                <td>{respData.lastname}</td>
                <td>{respData.email}</td>
                <td>
                  {respData.status} {respData.verf_date}
                </td>
              </tr>
              <tr>
                <td colSpan={99}>{respData.comments}</td>
              </tr>
            </table>
            <form onSubmit={handle_NewUserForm}>
              <div>
                New Callsign: {respData.newcall} | New Password: {respData.newpass}
              </div>
              

              <textarea name="message" className="newapps-user-textarea" defaultValue={respData.mesg}></textarea>

              <div className="newapps-user-actionarea">
                <div className="newapps-user-radiogroup">
                
                  <label className="radio">
                    <input type="radio" id="approve" name="action" value="approve"/>
                    <span  className="name">APPROVE</span>
                  </label>
                  <label className="radio">
                    <input type="radio" id="email" name="action" value="email"/>
                    <span  className="name">EMAIL</span>
                  </label>
                  <label className="radio">
                    <input type="radio" id="reject" name="action" value="reject"/>
                    <span  className="name">REJECT</span>
                  </label>
                  <label className="radio">
                    <input type="radio" id="delete" name="action" value="delete"/>
                    <span  className="name">DELETE</span>
                  </label>
                </div>
                <div>
                  <input className="newapps-user-button" type='submit' value='submit'></input>
                </div>

              </div>
              <input type="hidden" name="rowid" value={params.id} />
              <input type="hidden" name="newcall" value={respData.newcall} />
              <input type="hidden" name="newpass" value={respData.newpass} />
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default AdminUserNew;
