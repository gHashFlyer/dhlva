import React, { useEffect, useState } from "react";
import {Link,Routes,Route,useNavigate,resolvePath,} from "react-router-dom";

import axios from "axios";

import Header from "../components/Header";

import logo from '../images/vhog2_cyanborder_trans.png'

const JoinForm = (props) => {
  const randx = Math.random();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [CID, setCID] = useState("");
  const [rating, setRating] = useState("");
  const [verify, setVerify] = useState("");
  const [comments, setComments] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [postData, setPostData] = useState(false);
  const [respData, setRespData] = useState(false);
  const [axiosError, setAxiosError] = useState(false);
  const navigate = useNavigate();

  const handleChangeFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const handleChangeLastName = (e) => {
    setLastName(e.target.value);
  };
  const handleChangeCID = (e) => {
    setCID(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangeRating = (e) => {
    setRating(e.target.value);
  };
  const handleChangeComments = (e) => {
    setComments(e.target.value);
  };
  const handleChangeVerify = (e) => {
    setVerify(e.target.value);
  };

  useEffect(() => {
    if (postData !== false) {
      console.log("axios..");
      axios
        .post("https://vhog.net/newapp/index.php", JSON.stringify(postData))
        .then((response) => {
          setRespData(response.data);
          if (response.data) {
            console.log(response.data);
            // Send the object up to App.js:
            //props.appLogin(response.data);
            navigate("/", { replace: true });
          } else {
            console.log("no resp data");
            setErrorMessage("Invalid Login");
          }
        })
        .catch((error) => {
          setAxiosError(error);
          setErrorMessage(error.message);
        });

      //console.log(postData)
      setPostData(false);
    }
    return () => {};
  }, [postData]);

  const handleFormSubmission = (event) => {
    event.preventDefault();

    if (comments.trim === "") {
      return;
    }
    if (firstName.trim() === "") {
      return;
    }
    if (lastName.trim() === "") {
      return;
    }
    if (email.trim() === "") {
      return;
    }
    if (verify.trim() !== "123") {
      // console.log("not 123")
      window.alert(
        "The product of three and forty one is one hundred twenty three."
      );
      return;
    }

    console.log("Form submitted");
    const params = {
      comments: comments,
      firstname: firstName,
      lastname: lastName,
      email: email,
    };
    console.log(params)

    setPostData(params);
  };

  return (
    <React.Fragment>
      <div className="userhome">
        <Header title={"Membership Form"} />

        <div className="userhome-content">
          <div className="userhome-lower">
            <form onSubmit={handleFormSubmission}>
              <div className="signup-form">
              <div className="signup-form-upper">
                <img className="signup-form-logo" src={logo} />                
                <div className="signup-form-description">
                  Welcome to VHOG - Virtual Helicopter Operations Group. We are
                  looking for like-minded helicopter enthusiasts who want to
                  join us online to explore and learn more about Virtual
                  aviation and helicopter operations. We welcome everyone with 
                  Microsoft Flight Simulator and X-Plane. 
                </div>
                </div>

                <div className="signup-form-lower">
                  <div className="signup-form-column">
                    <div className="signup-form-field">
                      <div className="signup-form-label">First Name</div>
                      <div className="signup-form-position">
                        <input
                          required
                          tabIndex={1}
                          type="text"
                          name="vhog1_fname"
                          id="field1"
                          value={firstName}
                          onChange={handleChangeFirstName}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="signup-form-column">
                    <div className="signup-form-field">
                      <div className="signup-form-label">Last Name</div>
                      <div className="signup-form-position">
                        <input
                          required
                          tabIndex={2}
                          type="text"
                          name="vhog2_lname"
                          id="field2"
                          value={lastName}
                          onChange={handleChangeLastName}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="signup-form-column">
                    <div className="signup-form-field">
                      <div className="signup-form-label">Email Address</div>
                      <div className="signup-form-position">
                        <input
                          required
                          tabIndex={3}
                          type="text"
                          name="vhog3_email"
                          id="field3"
                          value={email}
                          onChange={handleChangeEmail}
                        />
                      </div>
                    </div>

                    <div className="signup-form-field">
                      <div className="signup-form-label">3 x 41 = ?</div>
                      <div className="signup-form-position">
                        <input
                          required
                          tabIndex={4}
                          type="text"
                          name="vhog4_verify"
                          id="field4"
                          value={verify}
                          onChange={handleChangeVerify}
                        />
                      </div>
                    </div>

                    <div className="signup-form-field">
                      <div className="signup-form-label">Tell us about your aviation and helicopter experience; where did you hear about us, and what are you looking for here at VHOG?</div>
                      <div className="signup-form-position">
                      <textarea
                        required
                        tabIndex={5}
                        id="field5"
                        name="vhog5_comments"
                        onChange={handleChangeComments}
                      ></textarea>
                      </div>
                    </div>

                  </div>
                </div>
                <div className="signup-form-lower">
                    <div className="signup-form-buttongroup">
                        <input className="signup-form-button"  onClick={handleFormSubmission} type='button' value='Submit' />

                        <div className="signup-form-disclaimer">
                        By pressing the submit button you agree to our <a href='terms/terms.txt'>terms of use</a>.
                        </div>

                    </div>


                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default JoinForm;
