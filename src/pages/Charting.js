import React, { useState, useEffect} from "react";

import "./Charting.css";

import Header from "../components/Header";

import Chart from "react-apexcharts";


const Charting = (props) => {

    const [respData, setRespData] = useState(false);
    const [candleStickData, setCandleStickData] = useState()
    const [ticker, setTicker] = useState()

    useEffect(() => {


        let x = localStorage.getItem("data")
        // ticker = x.data.info.ticker
        // setTicker(ticker)

        x = JSON.parse(x)

        setTicker(x.info.ticker)
        
        const d = x.ohlc.epoch
        //console.log(d)

        const dd = d.map(x => x*100); 
        //console.log(dd)

        
        const o = x.ohlc.open
        const h = x.ohlc.high
        const l = x.ohlc.low
        const c = x.ohlc.close
        
        const result = dd.map((dd,i,j,k,m) => ([dd, o[i], h[i],l[i],c[i]]))


        const vvv = {
          options: {
            chart: {
              type: 'candlestick',
              height: 350
            },
            title: {
              text: ticker,
              align: 'center'
            },
            xaxis:{
              type: 'datetime'
            },

            yaxis: {
              tooltip: {
                enabled: true
              },
              labels: {
                formatter: function(val) {
                  return val.toFixed(0);
                }
              }              

            }            
          },          
          series: [{
            data: result
            }]
        };

        setCandleStickData(vvv)
        //console.log(vvv)


      return () => {}
    }, [])


    return(
    <React.Fragment>
      <div className="chart">
        <Header page="" />

      {candleStickData &&
        <div className="chart-area">
            <Chart options={candleStickData.options} 
            series={candleStickData.series}
            type="candlestick"/>
        </div>
      }


      </div>
        
    </React.Fragment>)
}


export default Charting;
