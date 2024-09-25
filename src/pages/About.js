import React from "react";

import "./About.css";
import Header from "../components/Header";


const About = (props) => {
    return(
    <React.Fragment>
        <div className="about">
            <Header page="About"/>
           
            <div className="about-body">

                <div className="about-item">
                    <div className="about-item-symbol">MT</div>
                    Number of consecutive days the stock meets all trend requirements of the Mark Minervini template.
                </div>
                <div className="about-item">
                    <div className="about-item-symbol">UD</div>
                    Number of days the price closed higher in the previous 10 days
                </div>
                <div className="about-item">
                    <div className="about-item-symbol">LSS</div>
                    Number of days the closing price is greater than the most recent closing price in the previous 52 weeks of trading (i.e., left-side suppy)
                </div>
                <div className="about-item">
                    <div className="about-item-symbol">V%</div>
                    Volume percent of the 50-day moving average volume
                </div>

                {/* (i.e., positive slope of 20-day trendline of SMA200) */}
                <div className="about-item">
                    <div className="about-item-symbol">∡</div>
                    Number of consecutive days the 200-day moving average is trending up 
                </div>

                <div className="about-item">
                    <div className="about-item-symbol">&gt;A</div>
                    Number of consecutive days the closing price is greater than the year-to-date Anchored Volume Weighted Average Price
                </div>                                

                <div className="about-item">
                    <div className="about-item-symbol">S/L</div>
                    Stop loss price is entry minus ATR and 2 standard deviations, or based on Max Stop Loss, whichever is smaller.
                </div>                      

                <div className="about-item">
                    <div className="about-item-symbol">T/P</div>
                        Take profit price, calculated at one percent of trading equity, or based on Risk:Reward, if set.
                </div>                      
                <div className="about-item">
                    <div className="about-item-symbol">RRR</div>
                    risk-to-reward ratio
                </div>                                      

                <div className="about-item">
                    <div className="about-item-symbol">Version 1.2</div>
                     9/25/2024 by Garen Evans
                </div>                      
                {/* <div className="about-version">
                    Version 1.0 by Garen Evans
                </div>                       */}

            </div>

        </div>
    </React.Fragment>)
}


export default About;
