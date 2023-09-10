import React, {useState} from "react";


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
          </div>
          <div className="notifications">
          <i className="fi fi-rr-bell"></i>
          </div>
          <div className="login-container">

          </div>
        </div>
    )
}

export default Heading;