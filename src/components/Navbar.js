import React from 'react';
import logo from '../assets/Bitcoin.png';
import { NavLink } from 'react-router-dom';
//import ReorderIcon from '@material-ui/icons/Reorder';
import '../styles/Navbar.css';

function navbar() {
  return (
    <div className='navbar'>
      <div className='coteGauche'>
        <img src={logo} />

      </div>
      <div className='coteDroit'>

        <NavLink to="/" >Home </NavLink>
        <NavLink to="/menu" >Menu </NavLink>
        <NavLink to="/aboutUs" >about us </NavLink>
        <NavLink to="/connexion" > connexion </NavLink>
        <NavLink to="/inscription"> inscription </NavLink>
        
      </div>
    </div>
  )
}

export default navbar
