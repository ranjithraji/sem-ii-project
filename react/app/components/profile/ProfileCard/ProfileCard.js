import React from 'react';
import {
  Card, CardBody
} from 'reactstrap';
import { Link, withRouter } from 'react-router-dom'

const log = {
  padding: "9px",
  height: "42px",
  textAlign: "center"
}
const ed = {
  width: "131px",
  padding: "9px",
  height: "42px",
}
class profile extends React.Component {
  logOut(e) {
    e.preventDefault()
    localStorage.removeItem('usertoken')
    window.location = '/'
  }
  Edit(e) {
    e.preventDefault()
    window.location = '/showProfile'
  }

  render() {
    return (
      <div>

        <div className="row">
          <div className="col-4">
            <a href="" onClick={this.Edit.bind(this)} style={ed} className="btn nav-pro-btn btn-text">
              Profile
                 </a>
          </div>
          <div className="col-4">
            <a href="/order/buy" style={ed} className="btn nav-pro-btn btn-text ">
              Order
            </a>
          </div>
          <div className="col-4">
            <a href="/UpdateProfile" onClick={this.logOut.bind(this)} style={log} className="btn nav-pro-btn btn-text ">
              Logout
                    </a>
          </div>
        </div>
      </div>
    );
  }
};

export default withRouter(profile);