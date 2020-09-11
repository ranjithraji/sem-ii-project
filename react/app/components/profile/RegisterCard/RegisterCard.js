import React from 'react';
import {
  Card, CardBody
} from 'reactstrap';
import { Link } from 'react-router-dom'
class profile extends React.Component {

  render(){
  return (
              <a id="reg"  className="log-h">
                   <Link to="/login" className="log-h">
                    Login
                  </Link>
              </a>
  );
 }
};

export default profile;