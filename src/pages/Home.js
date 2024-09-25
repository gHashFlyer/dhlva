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
                        
                        <div className="home-settings">
                            <Link className="home-link" to="../settings">Settings</Link>


                            {/* <button className="home-button">Settings</button> */}
                        </div>

                        
                    </div>

                    
                </div>
    
            </div>
        </React.Fragment>)




}
export default Home;