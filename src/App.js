import React from 'react';
import "./App.css";

import Navbar from './components/Navbar';
import Fouter from './components/Fouter';
import Home from "./pages/Home";
import Menu from './pages/Menu';
import AboutUs from './pages/AboutUs';


import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import reactRouterDom from 'react-router-dom';

function App() {
  return (
    <div className="App">        
         <Router>
               <Navbar/> 
               <Switch>
                 <Route path="/" exact component={Home}/> 
                 <Route path="/menu" exact component={Menu}/> 
                 <Route path="/aboutUs" exact component={AboutUs}/> 
               </Switch>
               
             </Router>
         

    </div>
  );
}

export default App;
