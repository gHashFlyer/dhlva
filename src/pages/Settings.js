import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom';

import "./Settings.css";

import Header from "../components/Header";

const Settings = (props) => {

    const [equity, setEquity] = useState(10000)
    const [riskPercent, setRiskPercent] = useState(0.5)
    const [data, setData] = useState(false);
    const [shares, setShares] = useState(false)
    const [stoploss, setStoploss] = useState(false)
    const [stoplossPercent, setStoplossPercent] = useState(false)
    const [equityPercent, setEquityPercent] = useState(false)
    const [takeProfit, setTakeProfit] = useState(false)
    const [riskRewardRatio, setRiskRewardRatio] = useState(false)

    useEffect(() => {
        let x = localStorage.getItem("data")
        if(x){
            x = JSON.parse(x)
            if(x.info){
                console.log(x)
                setData(x)
            }
        }

        x = JSON.parse(localStorage.getItem("poscalc"))
        if(x){
            if(x.equity){
                const equity = x.equity
                setEquity(equity)
                const riskp = x.risk_percent
                setRiskPercent(riskp)
            }
        }
        console.log(x)
      return () => {}
    }, [])

    function handleForm(e){
        e.preventDefault();
        let equity = e.target.equity.value
        let riskp = e.target.risk_percent.value
        let riskValue = equity * riskp/100
        let price = e.target.entry_price.value
        let atr = data.technicals.atr
        let sdtr = data.technicals.sdtr

        let sl = price - (atr + 2 * sdtr)


        // Limit stop loss to no more than 8% loss
        let slp = (sl - price) / price

        console.log(slp)
        if(slp < -0.080){
            console.log(sl)
            sl = 0.92 * price
            slp = (sl - price) / price
        }


        
        sl = Math.round(sl*100,2)/100
        slp = Math.round(10*100*Math.abs(slp))/10 //percent loss

        console.log(slp)

        let snum = Math.round(riskValue / (price - sl))

        let cost = snum * price
        let pct_equity = Math.round(10*  (100*cost/equity)  ) / 10
        
        // limit size of trade to 10% of equity
        if(pct_equity > 10){
            riskValue = equity * 0.10
            snum = Math.round(riskValue / price )
            slp = (sl - price) / price
            if(slp < -0.080){
                sl = 0.92 * price
            }
            sl = Math.round(sl*100,2)/100
            slp = Math.round(10*100*Math.abs(slp))/10 //percent loss            

            cost = snum * price
            pct_equity = Math.round(10*  (100*cost/equity)  ) / 10            
        }

        // calculate a take profit price such that it will increase
        // equity by one percent
        let tp = ( cost  +  (0.01 * equity) ) / snum
        tp = Math.round(tp * 100)/100
        setTakeProfit(tp)
    
        // calculate risk to reward ratio
        let risk = price - sl
        let reward = tp - price
        let rr = reward / risk
        rr = Math.round(100 * rr) / 100
        setRiskRewardRatio(rr)
        console.log(slp)

        setShares(snum)
        setStoploss(sl)
        setStoplossPercent(slp)
        setEquityPercent(pct_equity)

        
        
        const pscData = {equity: equity, risk_percent: riskp, cost: cost, pct_equity:pct_equity, takeprofit: takeProfit}

        console.log(pscData)
        localStorage.setItem("poscalc", JSON.stringify(pscData) );
    }    


    return(
    <React.Fragment>
        <div className="settings">
            <Header page="PositionCalc"/>
            
            <div className="settings-body">
                {!data && <div className="settings-form-header"> No Ticker </div>}
                {data &&
                
                <form className="settings-form" onSubmit={handleForm}>

                    <div className="settings-form-header">Settings</div>


                    <div className="settings-form-label">Trading Equity</div>
                    <input required className="settings-form-input" type="text" placeholder="trading equity" id="equity" name="equity" defaultValue={equity} />

                    <div className="settings-form-label">Max Trade Position (%)</div>
                    <input required className="settings-form-input" type="text" placeholder="entry price" id="entry" name="entry_price"  defaultValue={"10"}/>
                    
                    <div className="settings-form-label">Equity Risk (%)</div>
                    <input required className="settings-form-input" type="text" placeholder="percent risk" id="riskpercent" name="risk_percent" defaultValue={riskPercent} />



                    <div className="settings-form-label">Max Trade Risk (%)</div>
                    <input required className="settings-form-input" type="text" placeholder="entry price" id="entry" name="entry_price"  defaultValue={"8"}/>

                    <div className="settings-form-label">Risk:Reward (1:x)</div>
                    <input required className="settings-form-input" type="text" placeholder="entry price" id="entry" name="entry_price"  defaultValue={"auto"}/>



                    <button className="settings-form-button">Save Settings</button>



                    
                </form>
                }

                

            </div>

        </div>

    </React.Fragment>)
}


export default Settings;
