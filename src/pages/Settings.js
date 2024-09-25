import React, { useState, useEffect } from "react";

import "./Settings.css";

import Header from "../components/Header";

const Settings = (props) => {

    const [equity, setEquity] = useState()
    const [fullPosition, setFullPosition] = useState()
    const [equityRisk, setEquityRisk] = useState()
    const [maxStoploss, setMaxStopLoss] = useState()
    const [riskReward, setRiskReward] = useState()
    const [checked, setChecked] = useState(true)

    useEffect(() => {
        const x = JSON.parse(localStorage.getItem("settings"))
        if(x){
            if(x.equity){
                
                setEquity(x.equity)
                setFullPosition(x.full_position)
                setEquityRisk(x.equity_risk)
                setMaxStopLoss(x.max_stoploss)
                setRiskReward(x.risk_reward)

                if(x.risk_reward !== 'automatic'){
                    setChecked(false)
                }
            }
        }else{
            // Set default values
            setEquity(10000)
            setFullPosition(10)
            setEquityRisk(0.5)
            setMaxStopLoss(8)
            setRiskReward('automatic') 
        }
        console.log(x)
        
      return () => {}
    }, [])

    function handleForm(e){
        e.preventDefault();
        let equity = e.target.equity.value
        let full_position = e.target.full_position.value
        let equity_risk = e.target.equity_risk.value
        let max_stoploss = e.target.max_stoploss.value
        let risk_reward = e.target.risk_reward.value

        const obj = {equity: equity, full_position: full_position, equity_risk: equity_risk, max_stoploss:max_stoploss, risk_reward: risk_reward}
        console.log(obj)
        localStorage.setItem("settings", JSON.stringify( obj ) );
    }    

    function handleCheckbox(){
        if(checked){
            setRiskReward('3.0')
            setChecked(!checked)
        }else{
            setRiskReward(0)
        }

        setChecked(!checked)            

    }


    return(
    <React.Fragment>
        <div className="settings">
            <Header page=""/>
            
            <div className="settings-body">

                
                <form className="settings-form" onSubmit={handleForm}>

                    <div className="settings-form-header">Settings</div>


                    <div className="settings-form-label">Trading Equity</div>
                    <input required className="settings-form-input" type="text" placeholder="trading equity" id="equity" name="equity" defaultValue={equity} />

                    <div className="settings-form-label">Full Position (%)</div>
                    <input required className="settings-form-input" type="text" placeholder="max position percent" id="position" name="full_position"  defaultValue={fullPosition}/>
                    
                    <div className="settings-form-label">Equity Risk (%)</div>
                    <input required className="settings-form-input" type="text" placeholder="percent risk" id="riskpercent" name="equity_risk" defaultValue={equityRisk} />

                    <div className="settings-form-label">Max Stop Loss (%)</div>
                    <input required className="settings-form-input" type="text" placeholder="max stop loss" id="entry" name="max_stoploss"  defaultValue={maxStoploss}/>

                    {/* <div className="settings-form-label">Risk:Reward (1:x)</div>
                    <input required className="settings-form-input" type="text" placeholder="Risk:Reward" id="entry" name="riskreward"  defaultValue={"auto"}/> */}

                    <div>
                        <div className="settings-form-label-flex">
                        <div>Risk:Reward</div>
                        <label className="switch">
                            <input type="checkbox" checked={checked} onChange={handleCheckbox}/> 
                            <span className="slider"></span>
                        </label>     
                        </div>
                        {checked &&
                            <input required className="settings-form-input" type="text" placeholder="Risk:Reward" id="risk_reward" name="risk_reward"  defaultValue={'automatic'}/>
                        }
                        {!checked &&
                            <input required className="settings-form-input" type="text" placeholder="Risk:Reward" id="risk_reward" name="risk_reward"  defaultValue={riskReward}/>
                        }                        
                        
                    </div>


                    {/* {riskReward !== 0 &&
                    <div>
                        <div className="settings-form-label-flex">
                        <div>Risk:Reward</div>
                        <label className="switch">
                            <input type="checkbox" checked={checked} onChange={handleCheckbox}/> 
                            <span className="slider"></span>
                        </label>     
                        </div>
                        <input required className="settings-form-input" type="text" placeholder="Risk:Reward" id="risk_reward" name="risk_reward"  defaultValue={riskReward}/>
                    </div>
                    }
                    {riskReward === 0 &&
                    <div>
                        <div className="settings-form-label-flex">
                        <div>Risk:Reward</div>
                        <label className="switch">
                            <input type="checkbox" checked={checked} onChange={handleCheckbox}/> 
                            <span className="slider"></span>
                        </label>     
                        </div>
                        <input required className="settings-form-input" type="text" placeholder="Risk:Reward" id="risk_reward" name="risk_reward"  value={'automatic'}/>
                    </div>
                    }                     */}

       


                    <button className="settings-form-button">Save Settings</button>



                    
                </form>
                

                

            </div>

        </div>

    </React.Fragment>)
}


export default Settings;
