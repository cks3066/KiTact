import React, { Component } from "react";
import axios from "axios";

class Main extends Component {    
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
        return null;
    }
}

export default Main