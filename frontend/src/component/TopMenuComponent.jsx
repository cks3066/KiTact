import React from "react";
import {Navbar} from "react-bootstrap";
import {BrowserRouter as Router} from "react-router-dom";

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
                    <Navbar.Brand href="/order">
                        Order
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
            </Router>
    )
}
