import React, { Component } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bulma/css/bulma.min.css'
import axios from 'axios';

class App extends Component {

  state = {
    username: '',
    email: '',
    password: '',
    cfpassword: '',
    firstname: '',
    lastname: '',
    flag: true,
    pEmailhide: true,
    pPasshide: true,
    pCfPasshide: true,
    pShowJson: true,
    pUserhide: true
  }


  handleChangeUsername = (e) => {
    this.setState({
      username: e.target.value
    })
  }
  handleChangeEmail = (e) => {
    var emailValid = e.target.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    if (emailValid) {
      this.setState({
        email: e.target.value,
        flag: true
      })
    } else {
      this.setState({
        flag: false
      })
    }
  }
  handleChangePassword = (e) => {
    this.setState({
      password: e.target.value
    })
  }
  handleChangeCFPassword = (e) => {
    this.setState({
      cfpassword: e.target.value
    })
  }
  handleChangeFirstName = (e) => {
    this.setState({
      firstname: e.target.value
    })
  }
  handleChangeLastName = (e) => {
    this.setState({
      lastname: e.target.value
    })
  }

  onSubmit = (e) => {
    if (this.state.flag) {
      document.getElementById('statusEmail').classList.remove('is-danger')
      this.setState({
        pEmailhide: true
      })
      if (this.state.password === this.state.cfpassword) {
        var data = {
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
          firstname: this.state.firstname,
          lastname: this.state.lastname
        }
        axios.post("http://localhost:4001/register", data).then((res) => {
          if (res.data.status) {
            document.getElementById('statusUser').classList.remove('is-danger')
            this.setState({ pUserhide: true})
            console.log(res.data.status)
          }else{
            document.getElementById('statusUser').classList.add('is-danger')
            this.setState({ pUserhide: false})
          }
        })
        alert("success")
        document.getElementById('statusPass').classList.remove('is-danger')
        document.getElementById('statusCFPass').classList.remove('is-danger')
        this.setState({
          pCfPasshide: true,
          pPasshide: true,
          pShowJson: false
        })
      } else {
        document.getElementById('statusPass').classList.add('is-danger')
        document.getElementById('statusCFPass').classList.add('is-danger')
        this.setState({
          pCfPasshide: false,
          pPasshide: false,
          pShowJson: true
        })
      }
    } else {
      document.getElementById('statusEmail').classList.add('is-danger')
      this.setState({
        pEmailhide: false
      })
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark bg-dark">
          <span className="navbar-brand mb-0 h1">Register</span>
        </nav>
        <br />

        <div className=" box boxSize">
          {/* username */}
          <div className="field">
            <label className="label">Username</label>
            <div className="control has-icons-right">
              <input className="input" type="text" placeholder="Username" onChange={this.handleChangeUsername} id="statusUser" />
              <p className="help is-danger" hidden={this.state.pUserhide}>
                This username not available
              </p>
            </div>
          </div>
          {/* email */}
          <div className="field">
            <label className="label">Email Address</label>
            <div className="control  has-icons-right">
              <input className="input " type="email" placeholder="Email Address" onChange={this.handleChangeEmail} id="statusEmail" />
              <p className="help is-danger" hidden={this.state.pEmailhide}>
                This email is invalid
              </p>
            </div>
          </div>

          {/* password */}
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input className="input" type="password" placeholder="Password" onChange={this.handleChangePassword} id="statusPass" />
              <p className="help is-danger" hidden={this.state.pPasshide}>
                This password isn't match
              </p>
            </div>
          </div>
          {/* cfPassword */}
          <div className="field">
            <label className="label">Confirm Password</label>
            <div className="control">
              <input className="input" type="password" placeholder="Confirm Password" onChange={this.handleChangeCFPassword} id="statusCFPass" />
              <p className="help is-danger" hidden={this.state.pCfPasshide}>
                This password isn't match
              </p>
            </div>
          </div>
          {/* firstname */}
          <div className="field">
            <label className="label">First Name</label>
            <div className="control">
              <input className="input" type="text" placeholder="First Name" onChange={this.handleChangeFirstName} pattern="[a-zA-Z]*" />
            </div>
          </div>
          {/* lastname */}
          <div className="field">
            <label className="label">Last Name</label>
            <div className="control">
              <input className="input" type="text" placeholder="Last Name" onChange={this.handleChangeLastName} pattern="[^@]+@[^@]+\.[a-zA-Z]{2,6}" />
            </div>
          </div>
          {/* button */}
          <div className="field"><br />
            <a className="button has-text-white is-dark is-fullwidth " onClick={this.onSubmit}>Sign Up</a>
          </div>
        </div>
        <div className=" box boxSize" hidden={this.state.pShowJson}>
          <p hidden={this.state.pShowJson}>
            {'{'}<br />
            'username': '{this.state.username}', <br />
            'email': '{this.state.email}',<br />
            'password': '{this.state.password}', <br />
            'firstname': '{this.state.firstname}', <br />
            'lastname': '{this.state.lastname}'<br />
            {'}'}
          </p>
        </div>
      </div>
    );
  }
}

export default App;
