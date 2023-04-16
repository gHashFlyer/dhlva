import React from "react";

// import bg_image from "../images/bgimage.png"

const Home=()=>{
    return(
        <React.Fragment>
            <div className="home">
                
                <div className="home-section">
                    <div className="home-section-label">ABOUT US</div>
                    <div className="home-section-content">
                        <p>
                        HoverDogs Virtual Airline began as an idea in 2023 from a group of friends who share a passion
                        for aviation and flight simulation, and helicopter operations in particular. Most of us here have many
                        thousands of hours of flight time in large jets and turbprops, and belong to other virtual airlines 
                        that cater to structured flight operations, revenue, landing rates, and other metrics. But here we're all 
                        hover dogs at heart, and this is where we have fun.
                        </p>
                        <p>
                        All flight simmers are welcome to apply for membership as a Hover Dog! You don't even have to fly a helicopter, but
                        you will get the most out of your time here by flying online and offline using X-Plane, Microsoft Flight Simulator, and P3D. 
                        We have a few rules, or course, but it's mostly to keep out the trouble-makers.
                        </p>
                        <p>
                        We allow all aircraft types, including large and small jets, turboprops, single and multi-engine general aviation aircraft, 
                        helicopters and other rotorcraft and VTOLs such as the Osprey and Harrier.  Flight reporting is via our custom software, which
                        is the simplest ACARS to set up and definitely the easiest to operate.
                        </p>
                    </div>

                </div>

                <div className="home-section">
                    <div className="home-section-label">RULES</div>
                    <div className="home-section-content">
                        <p>
                        Mainly it's this: be considerate, courteous, and play nice with others.  That's about it in a nutshell, but just 
                        so you know our expectations we list the following important rules and requirements for membership:
                        </p>
                        <ol>
                            <li>You are a member of our Discord server.</li>
                            <li>You have logged at least 25 hours as a pilot on VATSIM.</li>
                            <li>You have a valid and active email address.</li>
                            <li>You agree to our privacy policy, Discord policy, and rules.</li>
                        </ol>
                    </div>

                </div>

            </div>
        </React.Fragment>
    )
}
export default Home;