import React, { Component } from 'react'
import { register } from '../UserFunctions'
import Card from './RegisterCard'
class Register extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      phone: '',
      email: '',
      password: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit(e) {
    e.preventDefault()

    const newUser = {
      name: this.state.name,
      phone: this.state.phone,
      email: this.state.email,
      password: this.state.password
    }

    register(newUser).then(res => {
      if (res) {
        window.location = '/Firstlogin'
      }
    })
  }

  cancel() {
    window.location = '/'
  }

  render() {
    return (
      <div className="con container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Register</h1>
              <div className="form-group">
                <label htmlFor="name">Username</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Enter your Username"
                  value={this.state.name}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Phone</label>
                <input
                  type="Number"
                  className="form-control"
                  name="phone"
                  maxLength="10"
                  placeholder="Enter your Phone number"
                  value={this.state.phone}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </div>
              <div className="row">
                <div class="col-6">
                  <button type="submit" className="nav-pro-btn btn btn-block">Register!</button>
                </div>
                <div className="col-6">
                  <button type="submit" onClick={this.cancel.bind(this)} style={{}} className="nav-pro-btn btn btn-block">Cancel</button>
                </div>
                <h6 >You already have Account?   <Card /></h6>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Register
