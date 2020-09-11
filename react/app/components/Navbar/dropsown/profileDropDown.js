
import React, { useState } from 'react';
import { Modal,  ModalBody } from 'reactstrap';
import Profile from './ProfileLogin'
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import Register from '../../profile/RegisterCard/Register';
const ModalExample = (props) => {
  const {
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal); 
  } 
  const login=()=>{
    window.location='/login'; 
  }
  const register=()=>{
    window.location='/register'; 
  }
  return (
    <div className={'ok'}>
        <div onMouseEnter={toggle}> 
        <img  className="nav-ico-user" src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO7pHJh_XM2k2Ylln6TdlH_RjpBwyvK0pPBjh8Tmf8nAugNXsE&s'}/>
         <h5 className="nav-icon-user-text">Profile</h5>   
         </div>
       <Modal isOpen={modal} toggle={toggle}  className={className}>
        <ModalBody>
        <div className="row">
          <div className="col-2">
          </div>
             <div className="col-4">
                   <button type="submit" onClick={toggle}  className="btn-text btn nav-pro-btn" href="/login">
                     <Link to='/login' onClick={login} className="btn-text">Login</Link>
                  </button>
              </div>
              <div className="col-4">
              <button id="reg" onClick={toggle}  className="btn-text btn nav-pro-btn ">
                  <Link to="/register" onClick={register} className="btn-text">
                     Register
                  </Link>
               </button>
               </div>
               <div className="col-2">

               </div>
         </div>
       <br/>
       <Router>
        <div className="App">
            {/* <div className="container">
            <Route exact path="/register"  component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
           </div>*/}
         </div> 
        </Router> 
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ModalExample;