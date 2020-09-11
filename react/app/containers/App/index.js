/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { Component } from 'react';
//import { Switch, Route } from 'react-router-dom';
import Home from '../HomePage/main';
import '../../../docs/css/style.css';
import { BrowserRouter as Router, Route , Switch} from 'react-router-dom';


 class App extends Component{

  render(){
  return(
    <div>
        <Home/>
    </div>
    )
  }
}

export default App;