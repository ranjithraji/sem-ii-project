import React, { Component } from 'react'
import { update } from '../../profile/UserFunctions'
import Card from './profileEditCard'
import jwt_decode from 'jwt-decode'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { withRouter } from 'react-router-dom'
class ProRegister extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      first_name: '',
      last_name: '',
      phone: '',
      email: '',
      dob: '',
      location: '',
      gender: '',
      phone2:'',
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.setState({
      name: decoded.name,
      phone: decoded.phone,
      email: decoded.email,
      password: decoded.password,
      first_name: decoded.first_name,
      last_name: decoded.last_name,
      location: decoded.location,
      dob: decoded.dob
    });
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit(e) {
    e.preventDefault()
    var updateUser={};
    if (this.state.phone2=='') {
       updateUser = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        location: this.state.location,
        token: localStorage.usertoken
      }

    }
    else {
       updateUser = {
        name: this.state.name,
        phone: this.state.phone2,
        email: this.state.email,
        password: this.state.password,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        location: this.state.location,
        token: localStorage.usertoken
      }
    }

    update(updateUser).then(res => {
      if (res) {
        localStorage.removeItem('usertoken')
        this.props.history.push('/Firstlogin');
      }
    });

  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Edit Profile</h1>
              <div className="form-group">
                <label htmlFor="first_name">Username</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Enter your  username"
                  value={this.state.name}
                  onChange={this.onChange}
                  disabled />
              </div>
              <div className="form-group">
                <label htmlFor="first_name">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="first_name"
                  placeholder="Enter your  first name"
                  value={this.state.first_name}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="last_name">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="last_name"
                  placeholder="Enter your  last name"
                  value={this.state.last_name}
                  onChange={this.onChange} required
                />
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    placeholder="Enter your  email"
                    value={this.state.email}
                    onChange={this.onChange}
                    disabled />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="name">Phone</label>
                {(this.state.phone) ? (
                  <input
                    type="Number"
                    className="form-control "
                    name="phone"
                    maxLength="10"
                    pattern="[1-9]{1}[0-9]{9}"
                    placeholder="Enter your Phone number"
                    value={this.state.phone}
                    onChange={this.onChange} disabled
                  />
                ) : (
                    <input
                      type="Number"
                      className="form-control "
                      name="phone2"
                      maxLength="10"
                      pattern="[1-9]{1}[0-9]{9}"
                      placeholder="Enter your Phone number"
                      value={this.state.phone2}
                      onChange={this.onChange} required
                    />
                  )}
              </div>
              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  className="form-control"
                  name="location"
                  placeholder="Enter your  Location"
                  value={this.state.location}
                  onChange={this.onChange}
                />
              </div>
              <div className="row">
                <div className="col-2">
                </div>
                <div className="col-4">
                  <Card />
                </div>
                <div className="col-4">
                  <button type="submit" className="btn-text btn nav-pro-btn btn-block">CONFORM!  </button>
                </div>
                <div className="col-2">
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(ProRegister);