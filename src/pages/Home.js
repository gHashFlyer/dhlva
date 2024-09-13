import React from "react";

import './Home.css';

import Header from "../components/Header";
import RandomQuote from "./RandomQuote";


const Home = (props) => {
    return(
        <React.Fragment>
            <div className="home">
                <Header page="Home" />
                
                <div className="home-body">
                    <div className="home-content">
                        <RandomQuote />
                    </div>
                    
                    
                </div>
    
            </div>
        </React.Fragment>)




}
export default Home;