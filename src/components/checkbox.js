import React, { Component } from 'react'
import axios from 'axios';
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import '../../node_modules/bulma/css/bulma.min.css'

var showEducation = []

class checkbox extends Component {
    state = {
        dataEducation: [],
        productsList: showEducation,
        productCheked: [],
    }
    componentWillMount = () => {
        axios.get("http://localhost:4001/education").then((res) => {
            this.setState({ dataEducation: res.data })
        })

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
    check = () => {
        var data = this.state.productCheked
        this.props.handelSend(data);
    }
    shouldComponentUpdate = (nextProps, nextState) => {
        if (nextProps === this.props) {
            this.check()
            return true
        } else {
            return false
        }
    }

    render() {
        for (var i = 0; i < this.state.dataEducation.length; i++) {
            showEducation.push(this.state.dataEducation[i].educationLevel)
        }

        let { productsList } = this.state;
        return (

            <div>
                {this.props.productCheked}
                <div className="field">
                    <label className="label">Education</label>
                </div>
                <table>
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
                </table>
            </div>
        )

    }
}




export default checkbox