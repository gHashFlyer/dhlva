import React, { useState, useEffect } from "react";

import "./PositionCalc.css";

import Header from "../components/Header";

const PositionCalc = (props) => {

    const [equity, setEquity] = useState(10000)
    const [fullPosition, setFullPosition] = useState(10)
    const [equityRisk, setEquityRisk] = useState(0.5)
    const [maxStoploss, setMaxStopLoss] = useState(8)
    const [riskReward, setRiskReward] = useState('automatic')

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

        x = JSON.parse(localStorage.getItem("settings"))
        if(x){
            if(x.equity){
                setEquity(x.equity)
                setFullPosition(x.full_position)
                setEquityRisk(x.equity_risk)
                setMaxStopLoss(x.max_stoploss)
                setRiskReward(x.risk_reward)
            }
        }
        console.log(x)
      return () => {}
    }, [])

    function handleForm(e){
        e.preventDefault();
        
        let riskp = equityRisk
        let riskValue = equity * riskp/100
        let price = parseFloat(e.target.entry_price.value)
        let atr = data.technicals.atr
        let sdtr = data.technicals.sdtr

        let sl = price - (atr + 2 * sdtr)


        // Limit stop loss to no more than 8% loss
        let slp = (sl - price) / price


        const maxsl = -maxStoploss / 100
        const invsl = 1 - (maxStoploss/100)

        console.log(slp)
        if(slp < maxsl){
            console.log(sl)
            sl = invsl * price
            slp = (sl - price) / price
        }


        
        sl = Math.round(sl*100,2)/100
        slp = Math.round(10*100*Math.abs(slp))/10 //percent loss

        console.log(slp)

        let snum = Math.round(riskValue / (price - sl))

        let cost = snum * price
        let pct_equity = Math.round(10*  (100*cost/equity)  ) / 10

        console.log(pct_equity)
        
        // limit size of trade to fullPosition% of equity
        const fp = fullPosition / 100
        if(pct_equity > fullPosition){
            riskValue = equity * fp
            snum = Math.round(riskValue / price )
            slp = (sl - price) / price
            if(slp < maxsl){
                sl = invsl * price
            }
            sl = Math.round(sl*100,2)/100
            slp = Math.round(10*100*Math.abs(slp))/10 //percent loss            

            cost = snum * price
            pct_equity = Math.round(10*  (100*cost/equity)  ) / 10            
        }
        
        // calculate a take profit price such that it will increase
        // equity by one percent, unless riskReward !== 'automatic'
        let tp
        if(riskReward === 'automatic'){
            tp = ( cost  +  (0.01 * equity) ) / snum
            tp = Math.round(tp * 100)/100
            setTakeProfit(tp)
        }else{
            tp = (price+(3*(price-sl)))
            tp = Math.round(tp * 100)/100
            setTakeProfit(tp)            
        }

    
        // calculate risk to reward ratio
        let risk = price - sl
        let reward = tp - price
        let rr = reward / risk
        rr = Math.round(10 * rr) / 10

        setRiskRewardRatio(rr)
        setShares(snum)
        setStoploss(sl)
        setStoplossPercent(slp)
        setEquityPercent(pct_equity)

        
        
        // const pscData = {equity: equity, risk_percent: riskp, cost: cost, pct_equity:pct_equity, takeprofit: takeProfit}

        // console.log(pscData)
        // localStorage.setItem("poscalc", JSON.stringify(pscData) );
    }    


    return(
    <React.Fragment>
        <div className="poscalc">
            <Header page="PositionCalc"/>
            
            <div className="poscalc-body">
                {!data && <div className="poscalc-form-header"> No Ticker </div>}

                {data &&

                <form className="poscalc-form" onSubmit={handleForm}>

                    <div className="poscalc-form-header"> 
                    <div>{data.info.ticker} </div>
                    <div>
                        <input required className="poscalc-form-price" type="text" placeholder="price" id="entry" name="entry_price"  defaultValue={data.technicals.price}/>
                    </div>
                    

                    </div>

                    {shares && 
                        <div>
                            <div className="poscalc-form-result">Shares: {shares} ({equityPercent}%)</div>
                            <div className="poscalc-form-result">S/L {stoploss}  ({stoplossPercent}%)</div>
                            <div className="poscalc-form-result">T/P {takeProfit}</div>
                            <div className="poscalc-form-result">RRR {riskRewardRatio}</div>
                        </div>
                    }

                    <button className="poscalc-form-button">CALCULATE</button>

                    {/* <div className="poscalc-form-label">Entry Price</div>
                    <input required className="poscalc-form-input" type="text" placeholder="entry price" id="entry" name="entry_price"  defaultValue={data.technicals.price}/> */}

                </form>
                }

                

            </div>

        </div>

    </React.Fragment>)
}


export default PositionCalc;
