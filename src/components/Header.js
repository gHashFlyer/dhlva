import React, { useRef, useEffect } from "react";
import {Link} from 'react-router-dom';

import "./Header.css";


const Header = (props) => {

    const p1 = useRef()
    const p2 = useRef()
    const p3 = useRef()
    const p4 = useRef()

    let className = "home-menu-item button_slide slide_right"

    useEffect(() => {

        if(props.page === 'Home'){
            p1.current.style.borderStyle = "dashed"
            p1.current.style.borderColor = "yellow"
        }
        if(props.page === 'Minervini'){
            p2.current.style.borderStyle = "dashed"
            p2.current.style.borderColor = "yellow"
        }        
        if(props.page === 'PositionCalc'){
            p3.current.style.borderStyle = "dashed"
            p3.current.style.borderColor = "yellow"
        }                
        if(props.page === 'About'){
            p4.current.style.borderStyle = "dashed"
            p4.current.style.borderColor = "yellow"
        }                        
        if(props.page === 'Trend'){
            p4.current.style.borderStyle = "solid"
            p4.current.style.borderColor = "cyan"
        }                                
    
        return () => {}
    }, [props.page])


    return(
    <React.Fragment>

        <div className="header-menu">
            <Link ref={p1} to="../"        className={className}>Home</Link>
            <Link ref={p2} to="../trend"   className={className}>MMT</Link>
            <Link ref={p3} to="../poscalc" className={className}>PSC</Link>
            <Link ref={p4} to="../about"   className={className}>??</Link>
        </div>

    </React.Fragment>)
}


export default Header;
