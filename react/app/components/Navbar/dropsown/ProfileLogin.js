
import React, { useState } from 'react';
import { Modal,  ModalBody } from 'reactstrap';
import Profile from '../../profile/ProfileCard/Profile'
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
const ModalExample = (props) => {
  const {
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal); 
  } 
  return (
    <div>
        <div onMouseEnter={toggle}> 
        <img  className="nav-ico-user" src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO7pHJh_XM2k2Ylln6TdlH_RjpBwyvK0pPBjh8Tmf8nAugNXsE&s'}/>
         <h5 className="nav-icon-user-text">Profile</h5>   
         </div>
       <Modal isOpen={modal} toggle={toggle}  className={className}>
        <ModalBody>
         <Router>
        <div className="App">
         <div className="container">
            <Profile/>
           </div>
         </div> 
        </Router> 
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ModalExample;