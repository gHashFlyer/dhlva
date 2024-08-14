import React from "react";
import {Link} from 'react-router-dom'


const Acars=()=>{


    return(
        <React.Fragment>
            <div className="home">

                <div className="home-section">
                    <div className="home-section-label">
                        <Link to='/' className="backbutton">&laquo; return</Link> 
                    </div>                    
                    <div className="home-section-label">
                        VHOG HELICOPTER ACARS
                    </div>
                    <div className="home-section-descrip">
                        Our custom acars was designed specifically for helicopters.  It not only tracks flight time and
                        distance like any other acars, but also hover times, fpm for multiple landings (skids), time in start area,
                        min and max g-force, and other details specific to rotorcraft.                            
                    </div>                    
                    <div className="home-section-flex">
                        <div className="home-section-flex-left">
                            <div className="home-section-flex-header">Instructions</div>
                            <ol>
                                <li><b>You are the installer</b>: Download Acars by right-clicking on the button, and select Save (Link) As... </li>
                                <li>Extract the entire contents of the zip file to a folder of your choice (e.g., C:\ACARS).</li>
                                <li>Note: You can safely ignore any browser messages that the download was blocked - this is a false positive.</li>
                                <li>Note: In Chrome select Keep rather than Discard.</li>
                                <li>Start your flight simulator, then start the acars program.</li>
                                <li>Note: Some users report the need to Run as Administrator.</li>
                                <li>Note: Antivirus softare may need to be temporarily disabled, and/or set to ignore vhog_acars.exe</li>
                                <li>Note: Web blocking software (eg., Trend Micro) users have to add vhog.net to the exception list.</li>
                                <li>First time setup: enter the same callsign and password for the website into acars</li>
                            </ol>

                        </div>
                        <div className="home-section-flex-right">
                            {/* <div className="home-section-flex-header">Downloads</div> */}

                            <a href="https://vhog.net/acars/acars_full.zip"><button className="download-button"></button></a>


                            <div className="tidymesg">
                                Only if your acars needs an update: right-click the following button and save as, then Extract
                                the contents to your existing acars folder.
                            </div>
                            <a href="https://vhog.net/acars/acars_update.zip"><button className="download-button-update">Update Acars</button></a>
                        

                            <div className="uipc-links">
                                <div>
                                Acars communicates via FSUIPC (Microsoft) and XPUIPC (X-Plane).  Make sure you have the correct version installed for your flight simulator. Right click the download link and Save As.
                                </div>

                                <div>
                                    MSFS ... <a href="https://vhog.net/acars/Install_FSUIPC7.zip">Download FSUIPC7</a>
                                </div>

                                <div>
                                    X-Plane ... <a href="https://vhog.net/acars/XPUIPC_2.0.3.5_and_XPWideClient_2.0.0.3.zip">Download XPUIPC 2.0.3.5</a>
                                </div>                                
                                
                                <div>Note: if you already have FSUIPC/XPUIPC installed you can skip this step.</div>

                            </div>


                        </div>                        
                    </div>




                </div>

            </div>
        </React.Fragment>
    )
}
export default Acars;