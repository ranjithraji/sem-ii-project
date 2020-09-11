import React, { Component } from 'react'
import { login } from '../UserFunctions'
import Card from './loginCard'
class Login extends Component {
  constructor() {
    super()
    this.state = {
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
    const user = {
      email: this.state.email,
      password: this.state.password
    }

    login(user).then(res => {
      if (res) {
        alert("You are Welcome our page")
        window.location='http://localhost:3000/showProfile'
      }
    })
  }
  cancel(){
    window.location='/'
  }

  render() {
    return (
      <div className="con container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
   
   
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
                <div className="col-6">
                  <button type="submit"  className="nav-pro-btn btn btn-block">{}Sign in</button>
                </div>
                <div className="col-6">
                    <button type="submit"  onClick={this.cancel.bind(this)} style={{}} className="nav-pro-btn btn btn-block">Cancel</button>
                </div>
                <h6 >You don't have Account?  <Card/></h6>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login