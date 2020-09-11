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
    <div className="row">
      <div className="col-1"></div>
     <div className="col-4">
          <button  className="btn-text btn nav-pro-btn btn-block">
                     <Link to="/UpdateProfile" className="btn-text">
                       EDIT
                     </Link>
               </button>
     </div>
     <div className="col-4">
          <button  className="btn-text btn nav-pro-btn btn-block">
                     <Link to="/" className="btn-text">
                       HOME
                     </Link>
               </button>
     </div>
     <div className="col-1"></div>
    </div>
  );
 }
};

export default withRouter(profile);