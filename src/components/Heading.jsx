import React, {useState} from "react";
import '../styles/components-styles/heading.css';
import SearchBar from "./SearchBar.jsx";
import user from '../assets/user.png';

function Heading(){
    
    return(
        <div>
          <div className="search-form">
            <form action="POST">
              <SearchBar />
            </form>
            <div className="login-container-heading">
                <img className="user-circle" src={user} alt="User Photo" />
                <h2 className="user-name">Daniel Barbosa</h2>
                </div>
            </div>
        </div>
    )
}

export default Heading;