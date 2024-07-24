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

  const randx = Math.random();

  // Identify user and initate request for more data
  useEffect(() => {
    if (!callsign) {
      console.log(
        "get callsign and auth from local storage, and id = " + params.id
      );

      const cs = localStorage.getItem("callsign");
      const au = localStorage.getItem("auth");
      if (cs === null || au === null) {
        navigate("/", { replace: true });
      } else {
        const postParams = { callsign: cs, auth: au, id: params.id };
        console.log(postParams);
        setPostData(postParams);
      }
    }
    return () => {};
  }, []);

  // Get user data if there is a request
  useEffect(() => {
    if (postData) {
      axios
        .post(
          "https://vhog.net/api/get_newapps_user.php",
          JSON.stringify(postData)
        )
        .then((response) => {
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

  function handleLogout() {
    props.appLogout();
  }

  console.log("HERE WE ARE");
  // Verify user has access to this page.
  function handle_NewUserForm() {
    console.log("Hello");
  }

  return (
    <React.Fragment>
      <div className="userhome">
        <Header title={"Admin New User"} />

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
              <textarea name="message" className="newapps-user-textarea">THIS IS A TEXT AREA</textarea>
            <div>[Approve] - [Reject] - [Email]</div>
            <div><input type='submit' value='submit'></input></div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default AdminUserNew;
