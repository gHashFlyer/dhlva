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
                    <RandomQuote />
                </div>
    
            </div>
        </React.Fragment>)




}
export default Home;