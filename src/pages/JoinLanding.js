import React, { useEffect, useState } from "react";
import {Link,Routes,Route,useNavigate,resolvePath,} from "react-router-dom";

import axios from "axios";

import Header from "../components/Header";
import logo from '../images/vhog2_cyanborder_trans.png'

const JoinFormLanding = (props) => {


  return (
    <React.Fragment>
      <div className="userhome">
        <Header title={"Check Your Email"} />

        <div className="userhome-content">
          <div className="userhome-lower">
            <div className="userhome-content">
            We can not proceed until you have verified your email address.  Check your email for a message from chiefpilot@vhog.net
            <p>Click on the link in your email to verify your email address, then we will review your application.</p>
            <p>If you do not see a message in your inbox, check your spam folder - be sure to whitelist all messages from vhog.net</p>
            <p></p>
            
            </div>
            
            
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default JoinFormLanding;
