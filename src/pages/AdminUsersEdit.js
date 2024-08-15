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


const AdminUsersEdit = (props) => {
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

//   // Get the users who have signed up but are not members yet
//   useEffect(() => {
//     if (postData) {
//       axios
//         .post("https://vhog.net/api/get_users.php",JSON.stringify(postData))
//         .then((response) => {

//           //response.data.mesg = response.data.mesg.replaceAll('#','\n')

//           setRespData(response.data);
//           if (response.data) {
//             console.log(response.data);
//           } else {
//             console.log("...");
//           }
//         })
//         .catch((error) => {
//           console.log("axios error");
//         });
//       setPostData(false);
//     }

//     return () => {};
//   }, [postData]);



  // Get data if there is a request
  useEffect(() => {
    if (postData) {
      axios
        .post(
          "https://vhog.net/api/get_users.php",
          JSON.stringify(postData)
        )
        .then((response) => {
          //response.data.mesg = response.data.mesg.replaceAll('#','\n')

          setRespData(response.data.users[0]);
          if (response.data) {
            console.log(response.data.users[0]);
          } else {
            console.log("...");
          }
        })
        .catch((error) => {
          console.log(error.response.data);
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
          "https://vhog.net/api/admin_users_edit.php",
          JSON.stringify(formData)
        )
        .then((response) => {

          
          if (response.data) {
            console.log(response.data);
            setFormResponse(response.data);
            navigate("/xxxxx", { replace: true });
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

  function handleForm(e) {
    e.preventDefault()
    let admin = localStorage.getItem("callsign");
    let auth  = localStorage.getItem("auth");

    const params = {
        action: e.target.action.value,
        rowid: e.target.rowid.value,
        newfirstname: e.target.newfirst.value,
        newlastname: e.target.newlast.value,
        newemail: e.target.newemail.value,
        newcallsign: e.target.newcallsign.value,
        newstaff: e.target.newstaff.value,
        newpass:  e.target.newpassword.value,

        admin: admin,
        auth: auth,
    };

    console.log(params)
    //setFormData(params)
    
  }

  return (
    <React.Fragment>
      <div className="userhome">
        <Header title={`Manage: rowid=` + params.id} />

        <div className="userhome-content">
          <div className="userhome-lower">
            <form onSubmit={handleForm}>
            <table className="blueTable">
              <tr>
                <th>Joined</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Callsign</th>
                <th>Staff</th>
                <th>Password</th>
              </tr>
              <tr>
                <td>{respData.joindate}</td>
                <td><input type="text" name="newfirst" defaultValue={respData.firstname} /></td>
                <td><input type="text" name="newlast" defaultValue={respData.lastname} /></td>
                <td><input type="text" name="newemail" defaultValue={respData.email} /></td>
                <td><input type="text" name="newcallsign" defaultValue={respData.callsign} /></td>
                <td><input type="text" name="newstaff" defaultValue={respData.staff} /></td>
                <td><input type="text" name="newpassword" defaultValue='nochange' /></td>

              </tr>

            </table>
            <div className="home-section-label"></div>
            

              <div className="newapps-user-actionarea">
                <div className="newapps-user-radiogroup">
                  <label className="radio">
                    <input type="radio" id="approve" name="action" value="update"/>
                    <span  className="name">UPDATE</span>
                  </label>
                  <label className="radio">
                    <input type="radio" id="email" name="action" value="email"/>
                    <span  className="name">EMAIL</span>
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
              
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default AdminUsersEdit;
