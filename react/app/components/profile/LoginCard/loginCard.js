import React from 'react';
import {
  Card, CardBody
} from 'reactstrap';
import { Link } from 'react-router-dom'
class profile extends React.Component {

  render(){
  return (
              <a id="reg"  className="log-h">
                   <Link to="/register" className="log-h">
                     Register
                  </Link>
               </a>
  );
 }
};

export default profile;