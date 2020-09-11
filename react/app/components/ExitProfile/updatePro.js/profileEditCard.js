import React from 'react';
import {
  Card, CardBody
} from 'reactstrap';
import { Link ,withRouter } from 'react-router-dom'

const log={
    padding:"9px",
    height:"42px", 
    textAlign:"center"
}
class profile extends React.Component {
  
  render(){
  return (
   
          <button  className="btn-text btn nav-pro-btn btn-block">
                     <Link to="/" className="btn-text">
                       CANCEL
                     </Link>
               </button>
  );
 }
};

export default withRouter(profile);