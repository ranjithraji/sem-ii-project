import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import Card from './showEditCard';
class Profile extends Component {
  constructor() {
    super()
    this.state = {
      first_name:'',
      last_name:'',
      phone: '',
      email: '',
      location:'',
      errors: {}
    }
  }


  componentDidMount() {
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.setState({
      name:decoded.name,
      phone: decoded.phone,
      email: decoded.email,
      password:decoded.password,
      first_name:decoded.first_name,
      last_name:decoded.last_name,
      location:decoded.location
      
    });
  }

  render() {
    return (
      <div className="container">
        <div className="profile-co jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">PROFILE</h1>
          </div>
          <table className="table col-md-8 mx-auto">
            <tbody>
               <tr>
                <td>USER NAME</td>
                <td>{this.state.name}</td>
              </tr>
              <tr>
                <td>FIRST NAME</td>
                <td>{this.state.first_name}</td>
              </tr>
              <tr>
                <td>LAST NAME</td>
                <td>{this.state.last_name}</td>
              </tr>
              <tr>
                <td>PHONE</td>
                <td>{this.state.phone}</td>
              </tr>
              <tr>
                <td>EMAIL</td>
                <td>{this.state.email}</td>
              </tr>
              <tr>
                <td>LOCATION</td>
                <td>{this.state.location}</td>
              </tr>
             </tbody>
          </table>
          <Card/>
        </div>
      </div>
    )
  }
}

export default Profile
