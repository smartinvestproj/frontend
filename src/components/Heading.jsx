import React from "react";
import '../styles/components-styles/heading.css';


function Heading(){
    
    return(
        <div>
          <div className="search-form">
            <form action="POST">
              <div className="search-container">
              <input className="search-input" type="text" placeholder="Search"/>
              <i className="fi fi-rr-search search-icon"></i>
              </div>
            </form>
            <div className="notifications">
              <i className="fi fi-rr-bell"></i>
          </div>
          <div className="login-container">

          </div>
          </div>
          
        </div>
    )
}

export default Heading;