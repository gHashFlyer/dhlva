import React, {useState, useEffect} from "react";
import {Link, useNavigate} from 'react-router-dom'

//https://www.freecodecamp.org/news/how-to-use-axios-with-react/#what-is-axios
import axios from "axios";

const loginURL = "https://vhog.net/api/login.php"

const Login = (props) => {


    const [errorMessage, setErrorMessage] = useState("");
    const [postData, setPostData] = useState(false);
    const [respData, setRespData] = useState(false);
    const [axiosError, setAxiosError] = useState(false)
    const navigate = useNavigate();
 
    useEffect(() => {
        if(postData !== false){
            console.log("axios..")
            axios
                .post(loginURL,JSON.stringify(postData))
                .then((response)=>{
                    setRespData(response.data)
                    if(response.data){
                        console.log(response.data)
                        // Send the object up to App.js:
                        props.appLogin(response.data);
                        navigate('/userhome', {replace:true});
                    }else{
                        console.log("Login.js (31): invalid login")
                        setErrorMessage("Invalid Login");
                    }
                })
                .catch(error=> {
                    setAxiosError(error);
                    setErrorMessage(error.message)
                })

            //console.log(postData)
            setPostData(false)
        }
      return () => {}
    }, [postData])
    


    function handleForm(e){
        e.preventDefault();
        let x = e.target.human.value;
        if(x === '42'){
            let obj = {"login":e.target.username.value, "password":e.target.password.value}
            setPostData(obj);
            setErrorMessage("");
        }else{
            setErrorMessage("Error - correct form and try again")
        }

    }
    


return(
        <React.Fragment>
            <div className="login">
                <div className="login-cancel">
                    <Link className="login-cancel-link" to='/'>Home</Link>
                </div>
                    

                    <form className="login-form" onSubmit={handleForm}>
                        <h3>Login</h3>

                        <label className="login-form-label" for="username">Email Address</label>
                        <input required className="login-form-input" type="text" placeholder="Email Address" id="username" name="login"/>

                        <label className="login-form-label" for="password">Password</label>
                        <input required className="login-form-input" type="password" placeholder="Password" id="password" name="password"/>

                        <label className="login-form-label" for="human">What is 12 + 30?</label>
                        <input required className="login-form-input" type="text" placeholder="??" id="human" />

                        <button className="login-form-button">Log In</button>

                        <label className="login-form-error">{errorMessage}</label>

                    </form>





            </div>
        </React.Fragment>
    )

}
export default Login;