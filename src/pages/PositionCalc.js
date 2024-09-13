import React, { useState, useEffect } from "react";

import "./PositionCalc.css";

import Header from "../components/Header";

const PositionCalc = (props) => {

    const [equity, setEquity] = useState(10000)
    const [riskPercent, setRiskPercent] = useState(0.5)
    const [data, setData] = useState(false);
    const [shares, setShares] = useState(false)
    const [stoploss, setStoploss] = useState(false)
    const [stoplossPercent, setStoplossPercent] = useState(false)

    useEffect(() => {
        let x = localStorage.getItem("data")
        x = JSON.parse(x)
        console.log(x)
        setData(x)

        x = JSON.parse(localStorage.getItem("poscalc"))
        if(x){
            const equity = x.equity
            setEquity(equity)
            const riskp = x.risk_percent
            setRiskPercent(riskp)
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
        if(slp < -0.080){
            sl = 0.92 * price
        }
        sl = Math.round(sl*100,2)/100
        slp = Math.round(10*100*Math.abs(slp))/10 //percent loss

        let snum = Math.round(riskValue / (price - sl))

        setShares(snum)
        setStoploss(sl)
        setStoplossPercent(slp)
        
        const pscData = {equity: equity, risk_percent: riskp}

        localStorage.setItem("poscalc", JSON.stringify(pscData) );
    }    
    return(
    <React.Fragment>
        <div className="poscalc">
            <Header page="PositionCalc"/>
            
            <div className="poscalc-body">
                {data &&
                
                <form className="poscalc-form" onSubmit={handleForm}>

                    <div className="poscalc-form-header"> {data.info.ticker} </div>

                    <div className="poscalc-form-label">Entry Price</div>
                    <input required className="poscalc-form-input" type="text" placeholder="entry price" id="entry" name="entry_price"  defaultValue={data.technicals.price}/>

                    <div className="poscalc-form-label">Trading Equity</div>
                    <input autoFocus required className="poscalc-form-input" type="text" placeholder="trading equity" id="equity" name="equity" defaultValue={equity} />

                    <div className="poscalc-form-label">Equity Risk (%)</div>
                    <input required className="poscalc-form-input" type="text" placeholder="percent risk" id="riskpercent" name="risk_percent" defaultValue={riskPercent} />

                    {shares && 
                        <div>
                            <div className="poscalc-form-result">Shares: {shares}</div>
                            <div className="poscalc-form-result">Stop Loss: {stoploss}</div>
                            <div className="poscalc-form-result">Trade Risk: {stoplossPercent}%</div>
                        </div>
                    }


                    <button className="poscalc-form-button">CALCULATE</button>
                </form>
                }

                

            </div>

        </div>

    </React.Fragment>)
}


export default PositionCalc;
