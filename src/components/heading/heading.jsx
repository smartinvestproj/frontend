import React from "react";
import './heading.css';
import SearchBar from "./searchBar/SearchBar.jsx";
import user from '../../assets/user.png';

export default function Heading(){
    
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
