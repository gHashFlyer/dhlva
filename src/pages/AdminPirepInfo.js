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


const AdminPirepInfo = (props) => {
  const navigate = useNavigate();
  const params = useParams();

  const [respData, setRespData] = useState(false)
  const [formData, setFormData] = useState(false);
  const [formResponse, setFormResponse] = useState(false);

  const randx = Math.random();

  
  useEffect(() => {
      const postData = {"id":params.id}
      // console.log(postData)
      axios
        .post("https://vhog.net/api/get_pirep_details.php",JSON.stringify(postData))
        .then((response) => {
          
          if (response.data) {
            //console.log(response);
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


  // Submit formData to server and get forResponse (looking for 'OK')
  useEffect(() => {
    if (formData) {
      axios
        .post("https://vhog.net/api/admin_pirep_edit.php",JSON.stringify(formData))

        .then((response) => {

          if (response.data) {
            console.log(response.data);
            setFormResponse(response.data);
            window.alert("Server said: " + response.data)
            navigate("/admin_pireps", { replace: true });
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

    const paramz = {
      id: params.id,
      status: e.currentTarget.status.value,
      blocktime:e.currentTarget.blocktime.value,
      alofttime:e.currentTarget.alofttime.value,
      nightlog:e.currentTarget.nightlog.value,
      directnm:e.currentTarget.directnm.value,
      actualnm:e.currentTarget.actualnm.value,
    };

    console.log(paramz)
    setFormData(paramz)
    
  }

  return (
    <React.Fragment>
      <div className="userhome">
        <Header title={`Pirep Details: rowid=` + params.id} />

        <div className="userhome-content">
          <div className="userhome-lower">

            <form onSubmit={handleForm}>

            <table className="blueTable">
              <tr>
                <th>Timestamp</th>
                <th>User</th>
                <th>Status</th>
                <th>FS</th>
                <th>ACARS</th>
              </tr>
              <tr>
                <td>{respData.entrydate}</td>
                <td>{respData.user}</td>
                <td>{respData.status}</td>
                
                <td>{respData.fsversion}</td>
                <td>{respData.version}</td>
                <td></td>
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
                <th>HWC, XWC</th>
                <th>Hover 1</th>
                <th>Hover 2</th>
                <th>Hover 3</th>
                <th>TISA</th>                
              </tr>
              <tr>
                <td>{respData.windstart}</td>
                <td>{respData.takeoffHWC}, {respData.takeoffXWC}</td>
                <td>{respData.hover1}</td>
                <td>{respData.hover2}</td>
                <td>{respData.hover3}</td>
                <td>{respData.tisa}</td>
              </tr>

              <tr>
                <th>Landing Wind</th>
                <th>HWC, XWC</th>
                <th>FPM</th>
                <th>KTS</th>
                
                <th>Heading</th>                
                <th>Landing G</th>
              </tr>
              <tr>
                <td>{respData.windstop}</td>
                <td>{respData.landHWC}, {respData.landXWC}</td>
                <td>{respData.multifpm}</td>
                <td>{respData.landkts}</td>
                <td>{respData.land_truehdg}</td>
                <td>{respData.landg}</td>
              </tr>

              <tr>
                <th>Enr Fuel</th>
                <th>Taxi Fuel</th>
                <th>Block Fuel</th>
                <th>Avg Wind Dir/Speed</th>
                <th>Avg Headwind</th>
                <th>MinMax G</th>                
              </tr>
              <tr>
                <td>{respData.enroutefuel}</td>
                <td>{respData.taxifuel}</td>
                <td>{respData.blockfuel}</td>
                <td>{respData.wdavg} / {respData.wsavg}</td>
                <td>{respData.hwavg}</td>
                <td>{respData.gmin}, {respData.gmax}</td>
              </tr>

              <tr>
                <th colSpan={3}>Mark 1</th>
                <th colSpan={3}>Mark 2</th>
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

              <tr>
                <th>Status</th>
                <th>Aloft Time</th>
                <th>Block Time</th>
                <th>Night Log</th>
                <th>Direct NM</th>
                <th>Actual NM</th>
              </tr>
              <tr>

              </tr>
                <td><input type="text" name="status" defaultValue={respData.status} /></td>
                <td><input type="text" name="alofttime" defaultValue={respData.alofttime} /></td>
                <td><input type="text" name="blocktime" defaultValue={respData.blocktime} /></td>
                <td><input type="text" name="nightlog" defaultValue={respData.nightlog} /></td>
                <td><input type="text" name="directnm" defaultValue={respData.directnm} /></td>
                <td><input type="text" name="actualnm" defaultValue={respData.actualnm} /></td>
              <tr>
                <td colSpan={99}>
                  Pirep: {respData.pirep}
                </td>
              </tr>

            </table>              

              <div className="newapps-user-actionarea">
                <div>
                  <input className="" type='submit' value='submit'></input>
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
export default AdminPirepInfo;
