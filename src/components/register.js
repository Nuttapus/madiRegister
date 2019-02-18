import React, { Component } from 'react'
import './css/styles.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import '../../node_modules/bulma/css/bulma.min.css'
import axios from 'axios';
import countryList from 'react-select-country-list'
import Select from 'react-select'
import Checkbox from './checkbox'

class register extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        cfpassword: '',
        firstname: '',
        lastname: '',
        options: countryList().getData(),
        value: null,
        country: '',
        sex: '',
        education: [],
        flag: true,
        pEmailhide: true,
        pPasshide: true,
        pCfPasshide: true,
        pShowJson: true,
        pUserhide: true,
        dataCheckbox: []
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
    handleChangeSex = (e) => {
        this.setState({
            sex: e.target.value
        })
    }
    handleChangeCountry = value => {
        this.setState({ value })
        this.setState({
            country: value.label
        })
    }
    // toggleChangeEducation1 = (e) => {
    //     if (this.refs.checkbox1.checked === true) {
    //         this.setState({ education: this.state.education.concat(e.target.value) })
    //     } else {
    //         var array = this.state.education; // make a separate copy of the array
    //         var index = array.indexOf(e.target.value)
    //         if (index !== -1) {
    //             array.splice(index, 1)
    //             this.setState({ education: array })
    //         }
    //     }
    // }
    // toggleChangeEducation2 = (e) => {
    //     if (this.refs.checkbox2.checked === true) {
    //         this.setState({ education: this.state.education.concat(e.target.value) })
    //     } else {
    //         var array = this.state.education; // make a separate copy of the array
    //         var index = array.indexOf(e.target.value)
    //         if (index !== -1) {
    //             array.splice(index, 1);
    //             this.setState({ education: array });
    //         }
    //     }
    // }
    // toggleChangeEducation3 = (e) => {
    //     if (this.refs.checkbox3.checked === true) {
    //         this.setState({ education: this.state.education.concat(e.target.value) })
    //     } else {
    //         var array = this.state.education; // make a separate copy of the array
    //         var index = array.indexOf(e.target.value)
    //         if (index !== -1) {
    //             array.splice(index, 1);
    //             this.setState({ education: array });
    //         }
    //     }
    // }
    handelSet = (data) => {
        this.setState({
            dataCheckbox: data
        })
    }

    handelSetEducation = () => {
        let arr1 = this.state.dataCheckbox.slice();
        let arr2 = []
        for (var i = 0; i < this.state.dataCheckbox.length; i++) {
            if (this.state.dataCheckbox[i] === true) {
                arr1[i] = i;
            }
        }
        for (i = 0; i < arr1.length; i++) {
            if (arr1.includes(i)) {
                arr2.push(arr1[i])
            }
        }
        this.setState({ education: arr2 })
    }
    onSubmit = () => {
        // console.log(this.state.education)
        if (this.state.lastname !== "" && this.state.username !== "" && this.state.password !== "") {
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
                        lastname: this.state.lastname,
                        sex: this.state.sex,
                        country: this.state.country,
                        education: this.state.education,
                    }
                        axios.post("http://localhost:4001/register", data).then((res) => {
                            if (res.data.status) {
                                document.getElementById('statusUser').classList.remove('is-danger')
                                this.setState({ pUserhide: true })
                                console.log(res.data.status)
                                alert("success")
                            } else {
                                document.getElementById('statusUser').classList.add('is-danger')
                                this.setState({ pUserhide: false })
                                alert("This username not available")
                            }
                        })

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
        } else {
            alert("Please insert information all field")
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
                    {/* sex */}
                    <div className="field">
                        <label className="label">Sex</label>
                        <div className="control">
                            <div className="row">
                                <div className="col">
                                    <label className="radio">
                                        <input type="radio" name="answer" value="Man" onChange={this.handleChangeSex} />
                                        &nbsp;Man
                  </label>
                                </div>
                                <div className="col">
                                    <label className="radio">
                                        <input type="radio" name="answer" value="Female" onChange={this.handleChangeSex} />
                                        &nbsp;Female
                  </label>
                                </div>
                                <div className="col">
                                    <label className="radio">
                                        <input type="radio" name="answer" value="Alternative Sex" onChange={this.handleChangeSex} />
                                        &nbsp;Alternative Sex
                  </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* country */}
                    <div className="field">
                        <label className="label">Country</label>
                        <div className="is-fullwidth">
                            <Select
                                options={this.state.options}
                                value={this.state.value}
                                onChange={this.handleChangeCountry}
                            />
                        </div>
                    </div>
                    {/* education */}
                    <Checkbox handelSend={this.handelSet} /><p hidden={true}>{setTimeout(()=> this.handelSetEducation(), 500)}</p>

                    <div className="field">

                        {/* <label className="label">Education</label>
                <div className="row">
                  <div className="col">
                    <label className="checkbox">
                      <input type="checkbox" className="is-fullwidth" value="Primary education" ref="checkbox1" onChange={this.toggleChangeEducation1} />
                      &nbsp; Primary education
                </label>&nbsp;
                </div>
                  <div className="col">
                    <label className="checkbox ">
                      <input type="checkbox" className="is-fullwidth" value="Secondary education" ref="checkbox2" onChange={this.toggleChangeEducation2} />
                      &nbsp; Secondary education
                </label>&nbsp;
                </div>
                  <div className="col">
                    <label className="checkbox ">
                      <input type="checkbox" className="is-fullwidth" value="University education" ref="checkbox3" onChange={this.toggleChangeEducation3} />
                      &nbsp; University education
                </label>&nbsp;
                </div>
                </div> */}

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
                        'sex': '{this.state.sex}', <br />
                        'country': '{this.state.country}', <br />
                        'education': '{this.state.education}'<br />
                        {'}'}
                    </p>
                </div>
            </div>

        );
    }
}
export default register