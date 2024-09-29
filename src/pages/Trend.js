import React, { useState, useEffect, useRef } from "react";
import {Link} from 'react-router-dom';
//import {useNavigate} from 'react-router-dom';
import axios from "axios";

import "./Trend.css";

import Header from "../components/Header";

const tickerURL = "https://tickerdog.org/index.php"

const Trend = (props) => {

    //const navigate = useNavigate();

    const [postData, setPostData] = useState(false);
    const [respData, setRespData] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [axiosError, setAxiosError] = useState(false)
    const [busy, setBusy] = useState(false)

    const refTicker = useRef('')

    useEffect(() => {
        console.log("useEffect 22")
        let x = localStorage.getItem("data")
        if(x){
            x = JSON.parse(x)
            console.log(x)
            if(x.info){
                console.log(x.info.ticker)
                setRespData(x)
                refTicker.current = x.info.ticker
            }else{
                console.log("x is weird or no data")
            }            
        }else{
            console.log("x is false")
        }



      return () => {}
    }, [])
    
    
    
    useEffect(() => {
        if(postData !== false){
            console.log("axios..")
            setBusy(true)
            setRespData(false)
            axios
                .post(tickerURL,JSON.stringify(postData))
                .then((response)=>{
                    setRespData(response.data)
                    if(response.data){
                        console.log(response.data)
                        if(response.data === 'no data?'){
                            console.log("F")
                        }

                        localStorage.setItem("data", JSON.stringify(response.data) );
                        //let obj = JSON.parse(response.data)
                    }else{
                        console.log("Uh oh! Koala Banjo")
                        setErrorMessage("error");
                    }
                    setBusy(false)
                })
                .catch(error=> {
                    setBusy(false)
                    setAxiosError(error);
                    setErrorMessage(error.message)
                })

            //console.log(postData)
            setPostData(false)
        }
      return () => {}
    }, [postData])

    function validate_input(e){
        console.log("validate_input(): " + e.target.value)
    }

    function handleForm(e){
        e.preventDefault();

        let symbol = e.target.ticker.value
        let obj = {"ticker":symbol} //, "password":e.target.password.value}
        console.log(obj)
        setPostData(obj);
        setErrorMessage("");

    }

    let info = ""
    let mmt = ""
    if(busy){
        info = ""
        mmt = ""
    }
    
    if(respData && respData.technicals){

        mmt = <div className="trend-results_mmt">🛑<p>undesirable trend</p></div>
        if(respData.technicals.mmt === 'yes'){
            let ud = respData.technicals.updays10
            let mmtd = respData.technicals.mmt_days
            let lss = respData.technicals.lss_52w
            let vp50 = respData.technicals.vpct50
            let slope = respData.technicals.ma200Days
            let pvwap_days = respData.technicals.pvwap_days
            mmt = <div> 
                    <div className="trend-results_mmt">MT {mmtd}</div> 
                    <div className="trend-results_mmt">UD {ud}</div>
                    <div className="trend-results_mmt">LSS {lss}</div>
                    <div className="trend-results_mmt">V% {vp50}</div>
                    <div className="trend-results_mmt">∡ {slope}</div>
                    <div className="trend-results_mmt">&gt;A {pvwap_days}</div>
                  </div>
        }

    }
    return(
    <React.Fragment>
        <div className="trend">
            <Header page="Minervini"/>
            
            <div className="trend-body">
                <form className="trend-form" onSubmit={handleForm}>
                    <input autoFocus ref={refTicker} onChange={validate_input} disabled={busy?true:false} required className="trend-form-input" type="text" placeholder="symbol" id="ticker" name="ticker" defaultValue={refTicker.current} onFocus={(e) => e.currentTarget.setSelectionRange(e.currentTarget.value.length,e.currentTarget.value.length)}/>
                    <button disabled={busy?true:false} className="trend-form-button">GO</button>
                    <label className="trend-form-error">{errorMessage} {axiosError}</label>
                </form>
                {busy ? <div className='trend-form-busy'> -- working --  </div> : ""}
                {busy ? <div className="lds-facebook"><div></div><div></div><div></div></div> : ""}

                
                <div className="trend-results">
                    {info}
                    <div className="trend-results-lower">
                        {mmt==='' && busy === false ? "NO DATA": mmt}
                    </div>          

                    {mmt!=='' && busy === false ? <div><Link className="trend-link" to="../chart">Chart</Link></div>: '---'}
                    {mmt!=='' && busy === false ? <div><Link className="trend-link" to="../techs">Technicals</Link></div>: '---'}
                    
                </div>

            </div>

        </div>
    </React.Fragment>)
}


export default Trend;
