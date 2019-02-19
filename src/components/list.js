import React, { Component } from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import '../../node_modules/bulma/css/bulma.min.css'
import axios from 'axios';
import Modal1 from 'react-modal';
import { Modal, Button } from 'react-bootstrap'
import countryList from 'react-select-country-list'
import Select from 'react-select'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',

    }
};
Modal1.setAppElement('#root')
class list extends Component {
    state = {
        getData: [],
        listData: [],
        modalIsOpen: false,
        username: '',
        password: '',
        cfpassword: '',
        email: '',
        firstname: '',
        lastname: '',
        sex: '',
        country: '',
        dataEducation: [],
        education: [],
        options: countryList().getData(),
        value: null,
        productsList: ["Primary", "Secondary", "University"],
        productCheked: [],
    }
    componentWillMount = () => {
        axios.get("http://localhost:4001/listdata").then((res) => {
            this.setState({ getData: res.data })
        })
    }
    handleEditData = (i) => (e) => {
        this.setState({
            modalIsOpen: true,
            username: i.username,
            email: i.email,
            password: i.password,
            firstname: i.firstname,
            lastname: i.lastname,
            sex: i.sex,
            country: i.country,
            dataEducation: i.education,
        })
    }
    handleDeleteData = (i) => (e) => {
        var data = e.target.value
        axios.delete("http://localhost:4001/listdata/listdelete", { data: { data } }).then((res) => {
            if (res.data.status) {
                console.log(res.data.status)
                window.location.reload();
            }
        })
    }
    handleChangeCountry = value => {
        this.setState({ value })
        this.setState({
            country: value.label
        })
    }
    handleChangeSex = (e) => {
        this.setState({
            sex: e.target.value
        })
    }
    handleChangeCfpassword = (e) => {
        this.setState({
            cfpassword: e.target.value
        })
    }
    handleChangeEmail = (e) => {
        var emailValid = e.target.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        if (emailValid) {
            document.getElementById('statusEmail').classList.remove('is-danger')
            this.setState({
                email: e.target.value,
            })
        } else if (e.target.value === "") {
            document.getElementById('statusEmail').classList.remove('is-danger')
            document.getElementById('statusEmail').placeholder = this.state.email
        } else {
            document.getElementById('statusEmail').classList.add('is-danger')
        }
        console.log(this.state.email)
    }
    handleChangeFirstname = (e) => {
        if (e.target.value === "") {
            document.getElementById("statusFirstname").placeholder = this.state.firstname
        } else {
            this.setState({
                firstname: e.target.value,
            })
        }
    }
    handleChangeLastname = (e) => {
        if (e.target.value === "") {
            document.getElementById("statusLastname").placeholder = this.state.lastname
        } else {
            this.setState({
                lastname: e.target.value,
            })
        }
    }
    closeModal = () => {
        this.setState({ modalIsOpen: false });
    }
    onAddingItem = (i) => (e) => {
        if (this.state.productCheked[i] === true) {
            this.setState((state, props) => {
                state.productCheked[i] = false
            })
        } else {
            this.setState((state, props) => {
                state.productCheked[i] = true
            })
        }
    }
    onSave = () => {
        var checked = [];
        for (var i = 0; i < this.state.productCheked.length; i++) {
            if (this.state.productCheked[i] === true) {
                checked.push(i)
            }
        }
        var data = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            sex: this.state.sex,
            country: this.state.country,
            education: checked,
        }
        if (this.state.password === this.state.cfpassword) {
            document.getElementById('statusPass').classList.remove('is-danger')
            document.getElementById('statusCFPass').classList.remove('is-danger')
            axios.patch("http://localhost:4001/listdata/listupdate", data).then((res) => {
            if (res.data.status) {
                console.log(res.data.status)
                alert("Update success")
                window.location.reload();
            }
        })
    } else {
    document.getElementById('statusPass').classList.add('is-danger')
    document.getElementById('statusCFPass').classList.add('is-danger')
    alert("Password not matching")
}
    }
render() {
    let { getData } = this.state;
    let { productsList } = this.state;
    return (
        <div className="container">
            <center><h1 style={{ fontSize: 100 + `px` }}>List</h1></center>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Password</th>
                        <th scope="col">FirstName</th>
                        <th scope="col">LastName</th>
                        <th scope="col">Sex</th>
                        <th scope="col">Country</th>
                        <th scope="col">Education</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {getData.map((product, i) => {
                        return (
                            <tr key={i + 1}>
                                <th scope="row">{i + 1}</th>
                                <td>{product.username}</td>
                                <td>{product.email}</td>
                                <td>{product.password}</td>
                                <td>{product.firstname}</td>
                                <td>{product.lastname}</td>
                                <td>{product.sex}</td>
                                <td>{product.country}</td>
                                <td>{product.education}</td>
                                <td>
                                    <button type="button" className="btn btn-dark" value={product} onClick={this.handleEditData(product)} >Edit</button>
                                </td>
                                <td>
                                    <button type="button" className="btn btn-dark" value={product.username} onClick={this.handleDeleteData(i)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <Modal1
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.closeModal}
                style={customStyles}

            >

                <Modal.Header >
                    <Modal.Title>Tablename:  {this.state.username}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="field is-horizontal">
                        <div className="field-label is-normal">
                            <label className="label">Email:</label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control">
                                    <input className="input " type="text" placeholder={this.state.email} onChange={this.handleChangeEmail} id="statusEmail" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-label is-normal">
                            <label className="label">Password:</label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control">
                                    <input className="input " type="password" placeholder={this.state.password} id="statusPass" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-label is-normal">
                            <label className="label">Confirmpassword:</label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control">
                                    <input className="input " type="password" onChange={this.handleChangeCfpassword} id="statusCFPass" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-label is-normal">
                            <label className="label">Firstname:</label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control">
                                    <input className="input " type="text" placeholder={this.state.firstname} onChange={this.handleChangeFirstname} id="statusFirstname" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-label is-normal">
                            <label className="label">Lastname:</label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control">
                                    <input className="input " type="text" placeholder={this.state.lastname} onChange={this.handleChangeLastname} id="statusLastname" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="field ">
                        <label className="label">Sex:</label>
                        <div className="control">
                            <div className="row">
                                <div className="col">
                                    <label className="radio">
                                        <input type="radio" name="answer" value="Man" onChange={this.handleChangeSex} checked={this.state.sex === "Man"} />
                                        &nbsp;Man
                  </label>
                                </div>
                                <div className="col">
                                    <label className="radio">
                                        <input type="radio" name="answer" value="Female" onChange={this.handleChangeSex} checked={this.state.sex === "Female"} />
                                        &nbsp;Female
                  </label>
                                </div>
                                <div className="col">
                                    <label className="radio">
                                        <input type="radio" name="answer" value="Alternative Sex" onChange={this.handleChangeSex} checked={this.state.sex === "Alternative Sex"} />
                                        &nbsp;Alternative Sex
                  </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Country:</label>
                        <div className="is-fullwidth">
                            <Select
                                options={this.state.options}
                                value={this.state.value}
                                onChange={this.handleChangeCountry}
                                placeholder={this.state.country}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Education:</label>
                        <div >
                            <tbody>
                                {productsList.map((product, i) => {
                                    return (
                                        <tr key={i + 1}>
                                            <div className="checkbox checkbox-circle checkbox-color-scheme">
                                                <label className="checkbox-checked">
                                                    <input type="checkbox" value={product} onChange={this.onAddingItem(i)} />
                                                </label>
                                            </div>&nbsp;
                                    <td>{product}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </div>
                    </div>

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={this.closeModal}>Close</Button>
                    <Button variant="primary" onClick={this.onSave}>Save changes</Button>
                </Modal.Footer>

            </Modal1>
        </div>

    )
}
}



export default list