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


const UserLogDetail = (props) => {
  const navigate = useNavigate();
  const params = useParams();

  const [respData, setRespData] = useState(false)
  const [formData, setFormData] = useState(false);
  const [formResponse, setFormResponse] = useState(false);

  const randx = Math.random();

   
  useEffect(() => {
      const postData = {"id":params.id, "user":props.callsign}
      // console.log(postData)
      axios
        .post("https://vhog.net/api/get_pirep_details.php",JSON.stringify(postData))
        .then((response) => {
          
          if (response.data) {
            console.log(response.data);
            setRespData(response.data);
          } else {
            console.log("...");
          }
        })
        .catch((error) => {
          console.log("axios error");
        });

    return () => {};
  }, []);


  // Submit formData to server 

  useEffect(() => {
    if (formData) {
      axios
        .post("https://vhog.net/api/user_log_delete.php",JSON.stringify(formData))

        .then((response) => {

          if (response.data) {
            console.log(response.data);
            setFormResponse(response.data);
            window.alert("Server said: " + response.data)
            navigate("/userlogbook", { replace: true });
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

  function handleDelete(e) {
    e.preventDefault()

    const paramz = {
      id: params.id,
      vhash: respData.vhash,
      user: props.callsign
    };

    console.log(paramz)
    
    if(window.confirm("Delete this pirep?")){
      setFormData(paramz)
    }
   
  }

  function handleManageOFX(e){
    e.preventDefault()
    console.log(e.currentTarget.id)

  }

  return (
    <React.Fragment>

            <div className="userhome-header">
                <div className="userhome-header-menu">
                    {/* <Link to='/'><button className="userhome-header-menu-item">Home</button></Link>
                    <Link to='/userhome'><button className="userhome-header-menu-item">Dashboard</button></Link> */}
                    <Link to='/userlogbook'><button className="header-menu-item">Logbook</button></Link>
                    {respData && respData.staff && respData.staff === 'CEO'? 
                        <div>
                        <Link to='/admin_user_apps'><button className="header-menu-item">Admin User Apps</button></Link>
                        <Link to='/admin_pireps'><button className="header-menu-item">Admin Pireps</button></Link>
                        </div>                        
                    :""}


                </div>
            </div>

      <div className="userhome">
        <Header title={`Log Details`} />

        <div className="userhome-content">
          <div className="userhome-lower">

            <table className="blueTable">
              <tr>
                <th>Timestamp</th>
                <th>User</th>
                <th>Status</th>
                <th>FS</th>
                <th>ACARS</th>
                <th>Log ID</th>
              </tr>
              <tr>
                <td>{respData.entrydate}</td>
                <td>{respData.user}</td>
                <td>{respData.status}</td>
                
                <td>{respData.fsversion}</td>
                <td>{respData.version}</td>
                <td>{params.id}</td>
              </tr>
              <tr>
                <th>Flight</th>
                <th>Type</th>
                <th>Dist</th>
                <th>Lat,Lon</th>
                <th>Weight</th>
                <th>Fuel</th>                
              </tr>
              <tr>
                <td>{respData.orig}</td>
                <td>{respData.origtype}</td>
                <td>{respData.origdist}</td>
                <td>{respData.lat1}, {respData.lon1}</td>
                <td>{respData.takeoffwt}</td>
                <td>{respData.fuelstart}</td>
                
              </tr>

              <tr>
                <td>{respData.dest}</td>
                <td>{respData.desttype}</td>
                <td>{respData.destdist}</td>
                <td>{respData.lat2}, {respData.lon2}</td>
                <td>{respData.landwt}</td>
                <td>{respData.fuelstop}</td>
              </tr>

              <tr>
                <th>Aircraft</th>
                <th>Model</th>
                <th>Info</th>
                <th>OEW</th>
                <th>ZFW</th>
                <th>Payload</th>                
              </tr>
              <tr>
                <td>{respData.aircraft}</td>
                <td>{respData.aircraft_model}</td>
                <td>{respData.aircraft_info}</td>
                <td>{respData.oew}</td>
                <td>{respData.zfw}</td>
                <td>{respData.payload}</td>
              </tr>



              <tr>
                <th>Takeoff Wind</th>
                <th>HWC</th>
                <th>XWC</th>
                <th></th>
                <th></th>
                <th>TISA</th>                
              </tr>
              <tr>
                <td>{respData.windstart}</td>
                <td>{respData.takeoffHWC}</td>
                <td>{respData.takeoffXWC}</td>
                <td></td>
                <td></td>
                <td>{respData.tisa}</td>
              </tr>

              <tr>
                <th>Landing Wind</th>
                <th>HWC</th>
                <th>XWC</th>
                <th>FPM</th>
                <th></th>                
                <th></th>
              </tr>
              <tr>
                <td>{respData.windstop} </td>
                <td>{respData.landHWC}</td>
                <td>{respData.landXWC}</td>
                <td>{respData.multifpm}</td>
                <td></td>
                <td></td>
                <td>{respData.landg}</td>
              </tr>

              <tr>
                <th>Block Fuel</th>
                <th>Enroute Fuel</th>
                <th>Avg Wind Dir/Speed</th>
                <th>Avg Headwind</th>
                <th>Min G</th>
                <th>Max G</th>                
              </tr>
              <tr>
                <td>{respData.blockfuel}</td>
                <td>{respData.enroutefuel}</td>
                <td>{respData.wdavg} / {respData.wsavg}</td>
                <td>{respData.hwavg}</td>
                <td>{respData.gmin} </td>
                <td>{respData.gmax}</td>
              </tr>

              <tr>
                <th>Elapsed Time </th>
                <th>Time Aloft</th>
                <th>Night Log</th>
                <th>Precision Hover</th>
                <th>Commercial Hover</th>
                <th>General Hover</th>                
              </tr>
              <tr>
                <td>{respData.blocktime} </td>
                <td>{respData.alofttime} </td>
                <td>{respData.nightlog}</td>
                <td>{respData.hover1}</td>
                <td>{respData.hover2}</td>
                <td>{respData.hover3}</td>
              </tr>

              
              <tr>
              {respData.m1lat !== '0' && <th colSpan={3}>Mark 1</th>}
              {respData.m2lat !== '0' && <th colSpan={3}>Mark 2</th>}
              </tr>
              <tr>
                <td colSpan={3}>
                  {respData.m1lat !== '0' && respData.m1lat + `, ` + respData.m1lon + ` OG=` + respData.m1og + `, ` + `MSL=` + respData.m1msl }
                </td>
                <td colSpan={3}>
                  {respData.m2lat !== '0' && respData.m2lat + `, ` + respData.m2lon + ` OG=` + respData.m2og + `, ` + `MSL=` + respData.m2msl }                  
                </td>
              </tr>

              
              <tr>
              <td colSpan={99}>
                Pirep: {respData.pirep? respData.pirep: ""}
              </td>
            </tr>              
              


              <tr>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>                
              </tr>

              <tr>
                <td colSpan={99}>
                  Audit Flags: 
                  {respData.pause > 0 && `Pause=` + respData.pause }&nbsp;
                  {respData.warp > 0 && `Warp=` + respData.warp}&nbsp;
                  {respData.slew > 0 && `Slew=` + respData.slew}&nbsp;
                  {respData.simrate > 0 && `SimRate=` + respData.simrate}&nbsp;
                  {respData.crashed > 0 && `Crashed=` + respData.crashed}&nbsp;
                  {respData.refuel > 0 && `Refuel=` + respData.refuel}&nbsp;
                  {respData.refuel_total > 0 && `Refuel Total=` + respData.refuel_total}&nbsp;
                  {respData.nofuel > 0 && `Nofuel=` + respData.nofuel}&nbsp;
                  {respData.stall > 0 && `Stall=` + respData.stall}&nbsp;
                  {respData.overspeed > 0 && `Overspeed=` + respData.overspeed }&nbsp;
                  {respData.aircraft_changed > 0 && `AircraftChanged=` + respData.aircraft_changed}
                </td>
              </tr>
            </table>              


              {/* <div className="newapps-user-actionarea">
                <button id={params.id} onClick={handleDelete}>Delete</button>
                {respData.origtype === "OFX" &&
                  <button id='orig' onClick={handleManageOFX}>mgr orig</button>
                }
                {respData.desttype === "OFX" &&
                  <button id='dest' onClick={handleManageOFX}>mgr dest</button>
                }                
              </div> */}

          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default UserLogDetail;
