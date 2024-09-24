import React from "react";
import {Link} from 'react-router-dom';
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
                        <Link to="../settings">
                            <button className="home-button">Settings</button>
                        </Link>
                        
                    </div>

                    
                </div>
    
            </div>
        </React.Fragment>)




}
export default Home;