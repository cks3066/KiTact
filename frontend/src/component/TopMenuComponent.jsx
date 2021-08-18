import React from "react";
import {Navbar} from "react-bootstrap";
import {BrowserRouter as Router, Route} from "react-router-dom";

import Main from '../pages/Main'
import {DashboardComponent} from './DashboardComponent'
import SearchbyMap from "../pages/SearchbyMap";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

export const TopMenuComponent = () => {
    return (
        <Router>
                <Navbar
                    bg="dark"
                    variant="dark"
                    className="mb-4" >
                    <Navbar.Brand href="/">
                        Home
                    </Navbar.Brand>
                    <Navbar.Brand href="/menulist">
                        Menu
                    </Navbar.Brand>
                    <Navbar.Brand href="/dashboard">
                        Dashboard
                    </Navbar.Brand>
                    <Navbar.Brand href="/map">
                        Map
                    </Navbar.Brand>
                    <Navbar.Brand href="/login">
                        로그인
                    </Navbar.Brand>
                    <Navbar.Brand href="/signup">
                        회원가입
                    </Navbar.Brand>
                </Navbar>

                <Route path="/main" component={Main} />
                <Route path="/dashboard" component={DashboardComponent} />
                <Route path="/map" component={SearchbyMap} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />

            </Router>
    )
}
