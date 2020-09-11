import React from 'react';
import {
  Card, CardBody
} from 'reactstrap';
import { Link } from 'react-router-dom'
class profile extends React.Component {
 constructor(){
   super();
   this.state={
     LogShowMe:true,
     RegShowMe:true,
     ProShowMe:false
   }
 }

 openLog(){
   this.setState({
    LogShowMe:true,
    RegShowMe:false,
    ProShowMe:false
    })
 }
 openReg(){
  this.setState({
   LogShowMe:false,
   RegShowMe:true,
   ProShowMe:false
   })
}
Edit(e){
  e.preventDefault()
  this.props.history.push(`/login`)
}
  render(){
  return (
    <div>
 
             <div className="row">
             <div className="col-8">
                   <button type="submit" onClick={toggle}  className="btn-text btn nav-pro-btn" href="/login">
                     <Link to='/login' onClick={login}>Login</Link>
                  </button>
              </div>
              <div className="col-4">
              <button id="reg" onClick={toggle}  className="btn nav-pro-btn ">
                  <Link to="/register" onClick={login} className="nav-link">
                     Register
                  </Link>
               </button>
               </div>
               {/* <div className="col-4">
              <button onClick={()=>this.openLog().ProShowMe}    className="btn nav-pro-btn ">
                     <Link to="/profile" className="nav-link">
                       User
                     </Link>
               </button>
               </div>  */}
               </div>
    </div>
  );
 }
};

export default profile;

