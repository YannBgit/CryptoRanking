import React from 'react';
import { Link } from "react-router-dom";

import BannerImage from '../assets/img.jpg';
import '../styles/home.css';
//style={{ backgroundImage: `url(${BannerImage})` }}

function Home() {
  return (
    <div className="home" >
      <div className="headerContainer">
        <h1> Bitcoin </h1>
        <p> Here is ... </p>
        <Link to="/menu">
          <button> Get Menu </button>
        </Link>
      </div>
    </div>
  )
}

export default Home