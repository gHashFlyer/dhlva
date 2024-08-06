import React, {useState, useEffect } from "react";
import {Link} from 'react-router-dom'
import {Map, Marker, GeoJson} from 'pigeon-maps'
//import {osm} from 'pigeon-maps/providers'

import axios from "axios";

const sdata = {lat1: 37.59202026, lon1:66.32088712, lat2:37.42120418, lon2:66.564945}

function getCenter(x){
    let lat = (x.origlat + x.destlat) / 2
    let lon =  (x.origlon + x.destlon) / 2
    return {lat: lat, lon:lon}
}
function getTypeDescrp(x){
    if(x === "AP"){
        return "Airport"
    }
    if(x === "HP"){
        return "Heliport"
    }    
    if(x === "HHP"){
        return "Hospital Heliport"
    }    
    if(x === "OIL"){
        return "Oil Platform"
    }else{
        return "Off-Airport"
    }

}

const DailyFlight=()=>{

    const [resp, setResp] = useState(false);
    const [geoJson, setGeoJson] = useState(false)
    const [center, setCenter] = useState(false)
    const [oTyp, setOTyp] = useState(false)
    const [dTyp, setDTyp] = useState(false)
    const vvx = {"A":1}


    // When page loads get the data
    useEffect(() => {
            axios
            .post("https://vhog.net/api/get_dailyflight.php",JSON.stringify(vvx))
            // .get("https://vhog.net/api/get_dailyflight.php")
            .then((response)=>{
                // console.log(response.data.dailyflight)
                setResp(response.data.dailyflight)
                if(response.data.dailyflight){
                    const dfd = response.data.dailyflight
                    
                    let x = getGeoJson(dfd.origlat,dfd.origlon,dfd.destlat,dfd.destlon)
                    setGeoJson(x)
                    x = getCenter(dfd)
                    setCenter(x)
                    setOTyp(getTypeDescrp(dfd.origtype))
                    setDTyp(getTypeDescrp(dfd.desttype))


                }else{
                    console.log(".. no data? ..")
                }
            })
            .catch(error=> {
                console.log("axios error")
            })        
        return () => {};
    }, []);      

    function getGeoJson(olat, olon, dlat, dlon){

        const geojson = {
            type: "FeatureCollection",
            features: [
            {
                type: "Feature",
                geometry: { 
                    "coordinates": [
                        [olon,olat],
                        [dlon,dlat]
                    ],
                    "type": "LineString"
                },
                properties: { prop0: "R" + Math.random() },
            },
            ],
        };

        return geojson;

    }
    // const geoJsonSample = {
    //     type: "FeatureCollection",
    //     features: [
    //       {
    //         type: "Feature",
    //         geometry: { 
    //             "coordinates": [
    //                 [sdata.lon1,sdata.lat1],
    //                 [sdata.lon2,sdata.lat2]
    //               ],
    //               "type": "LineString"
    //          },
    //         properties: { prop0: "yeehaw" },
    //       },
    //     ],
    //   };


    return(
        <React.Fragment>
            <div className="home">

                <div className="home-section">
                    <div className="home-section-label">
                        <Link to='/'><button className="header-menu-item">[ back ]</button></Link> 
                    </div>                    
                    <div className="home-section-label">
                        THE DAILY FLIGHT
                    </div>

                    <div className="home-section-flex">
                        <div className="home-section-flex-left">
                            <div className="home-section-flex-header">
                                {resp && 
                                <Map height={400} defaultZoom={10}  defaultCenter={[center.lat,center.lon]}>
                                    
                                    <Marker width={30} anchor={[resp.origlat,resp.origlon]} color={'#0f0'} />
                                    <Marker width={30} anchor={[resp.destlat,resp.destlon]} color={'#f0f'} />

                                    <GeoJson
                                        data={geoJson}

                                        styleCallback={(feature, hover) => {
                                        if (feature.geometry.type === "LineString") {
                                            return { strokeWidth: "3", stroke: "black" };
                                        }
                                        return {
                                            fill: "#d4e6ec99",
                                            strokeWidth: "1",
                                            stroke: "white",
                                            r: "20",
                                        };
                                        }}
                                    />
                                </Map>
                                }
                            </div>
                        </div>
                        <div className="home-section-flex-right">
                            {resp && 
                            <table className="blueTable">
                                <tr>
                                    <th>
                                        Flight Details
                                    </th>
                                </tr>
                                <tr>
                                    <th>
                                        &nbsp;
                                        <br />
                                    </th>
                                </tr>                                

                                <tr>
                                    <td>
                                        Depart: {resp.orig}  ({resp.origid})
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Lat,Lon: {resp.origlat}, {resp.origlon}
                                        
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <hr />
                                    </td>
                                </tr>                                                                                                
                                <tr>
                                    <td>
                                    Arrive: {resp.dest} ({resp.destid})
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                    Lat,Lon: {resp.destlat}, {resp.destlon}
                                        <hr />
                                    </td>
                                </tr>                                                                


                                <tr>
                                    <td>
                                        {oTyp} to {dTyp}: {resp.distance} NM
                                    </td>
                                </tr>                                
                                <tr>
                                    <td>
                                        <br />
                                        Manifest: {resp.item}
                                        <br /><br /><br /><br /><br />
                                        
                                           Updated at {resp.utc}.  Fly only if able to submit flight report before top of hour.
    

                                    </td>
                                </tr>                                
                            </table>
                            }

                            {/* <Map height={300} defaultCenter={[-3.916667,136.216667]} defaultZoom={14}>
                                <Marker width={25} anchor={[-3.916667,136.216667]} />
                                <Marker width={25} anchor={[-3.823889,136.386111]} />
                            </Map> */}


                        </div>                        
                    </div>
                </div>

            </div>
        </React.Fragment>
    )
}
export default DailyFlight;