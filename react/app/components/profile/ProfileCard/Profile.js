import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import Card from './ProfileCard';
class Profile extends Component {
  constructor() {
    super()
    this.state = {
      name:'',
      phone: '',
      email: '',
      errors: {}
    }
  }

  componentDidMount() {
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.setState({
      name:decoded.name,
      phone: decoded.phone,
      email: decoded.email
    });
  }

  render() {
    return (
      <div className="container">
        <div className="profile-con jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">PROFILE</h1>
          </div>
          <table className="table col-md-10 mx-auto">
            <tbody>
            <tr>
                <td><i className="fa fa-user-o"></i></td>
                <td>{this.state.name}</td>
              </tr>
              <tr>
                <td><i className="fa fa-mobile"></i></td>
                <td>{this.state.phone}</td>
              </tr>
              <tr>
                <td><i className="fa fa-envelope-o"></i></td>
                <td>{this.state.email}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Card/>
      </div>
    )
  }
}

export default Profile
