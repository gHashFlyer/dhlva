import React, { useState, useEffect, useRef } from "react";
//import {useNavigate} from 'react-router-dom';
import axios from "axios";

import "./Minervini.css";

import Header from "../components/Header";

const tickerURL = "https://tickerdog.org/index.php"

const Minervini = (props) => {

    //const navigate = useNavigate();

    const [postData, setPostData] = useState(false);
    const [respData, setRespData] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [axiosError, setAxiosError] = useState(false)
    const [busy, setBusy] = useState(false)

    const refTicker = useRef()

    useEffect(() => {
        console.log("useEffect 22")
        let x = localStorage.getItem("data")
        x = JSON.parse(x)
        console.log(x.info.ticker)
        setRespData(x)
        refTicker.current = x.info.ticker

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
    // let output = "no data"
    let mmt = ""
    if(busy){
        info = ""
        // output = ""
        mmt = ""
    }
    // if(respData && respData.info && respData.technicals){



    //     info = 
    //             <div className="mini-results-upper">
    //                 <div className="mini-results-upper-ticker">{respData.info.ticker}</div>
    //                 <div className="mini-results-upper-price">Close: {respData.technicals.price}</div>
    //                 <div className="mini-results-upper-price">MA50: {respData.technicals.sma50} </div>
    //                 <div className="mini-results-upper-price">MA150: {respData.technicals.sma150}</div>
    //                 <div className="mini-results-upper-price"> MA200: {respData.technicals.sma200}</div>
    //                 {/* <div className="mini-results-upper-tech">Updays: {respData.technicals.updays10}</div>
    //                 <div className="mini-results-upper-tech">V%50: {respData.technicals.vpct50}%</div> */}
    //             </div>
                

    // }
    if(respData && respData.technicals){

        mmt = <div className="mini-results_mmt">{respData.info.ticker}🛑</div>
        if(respData.technicals.mmt === 'yes'){
            let ud = respData.technicals.updays10
            let mmtd = respData.technicals.mmt_days
            let lss = respData.technicals.lss_52w
            let vp50 = respData.technicals.vpct50
            let slope = respData.technicals.ma200Days
            let pvwap_days = respData.technicals.pvwap_days
            mmt = <div> 
                    <div className="mini-results_mmt">MT {mmtd}</div> 
                    <div className="mini-results_mmt">UD {ud}</div>
                    <div className="mini-results_mmt">LSS {lss}</div>
                    <div className="mini-results_mmt">V% {vp50}</div>
                    <div className="mini-results_mmt">∡ {slope}</div>
                    <div className="mini-results_mmt">&gt;A {pvwap_days}</div>
                  </div>
        }



    }
    return(
    <React.Fragment>
        <div className="mini">
            <Header page="Minervini"/>
            
            <div className="mini-body">
                <form className="mini-form" onSubmit={handleForm}>
                    <input autoFocus ref={refTicker} onChange={validate_input} disabled={busy?true:false} required className="mini-form-input" type="text" placeholder="symbol" id="ticker" name="ticker" defaultValue={refTicker.current} onFocus={(e) => e.currentTarget.setSelectionRange(e.currentTarget.value.length,e.currentTarget.value.length)}/>
                    <button disabled={busy?true:false} className="mini-form-button">GO</button>
                    <label className="mini-form-error">{errorMessage} {axiosError}</label>
                </form>
                {busy ? <div className='mini-form-busy'> -- busy --  </div> : ""}
                {busy ? <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div> : ""}
                
                <div className="mini-results">
                    {info}
                    <div className="mini-results-lower">
                        {mmt}
                    {/* {output} */}
                    </div>                
                </div>

            </div>

        </div>
    </React.Fragment>)
}


export default Minervini;
