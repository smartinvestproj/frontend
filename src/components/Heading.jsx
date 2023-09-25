import React, {useState} from "react";
import '../styles/components-styles/heading.css';
import user from '../assets/user.png';
import SearchBar from "./SearchBar";

function Heading(){
    
    return(
        <div>
          <div className="search-form">
            <form action="POST">
              <SearchBar />
            </form>
            <div className="login-container">
              <div className="notifications">
                <i className="fi fi-rr-bell"></i>
                <div className="notification-badge">44</div>
              </div>
              <i className="divider fi fi-rr-tally-1"></i>
              <img className="user-circle" src={user} alt="User Photo" />
              <h2 className="user-name">Daniel Barbosa</h2>
            </div>
          </div>
        </div>
    )
}

export default Heading;