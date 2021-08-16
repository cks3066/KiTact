import React, { Component } from "react";
import axios from "axios";

class MainComponent extends Component {    
    constructor(props) {
        super(props)
        this.state = {
            message: ""
        }
    }

    componentDidMount() {
        this.getApi();
    }

    getApi = () => {
        axios.get("http://localhost:8080/test/time")
            .then(res => {
                console.log(res);
                this.setState({
                    message: res.data
                })
            })
            .catch(res => console.log(res))
    }

    render() {
        return(
            <div>
                Main 페이지
                {this.state.message}
            </div>
        )
    }
}

export default MainComponent