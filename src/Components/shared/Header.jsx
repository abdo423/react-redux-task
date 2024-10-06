import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./general.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Posts from "../Pages/Posts/Posts";
import About from "../Pages/About/About";
import Contact from "../Pages/Contact/Contact";
import Services from "../Pages/Services/Services";
import PostDetails from "../Pages/PostDetails/PostDetails";

function Header() {
  return (
    <Router>
      <header className="mainHeader">
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand>
              <Link className="navLink" to="/">
                Company Logo
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ms-auto mainNav">
                <Link className="navLink" to="/">
                  Home
                </Link>
                <Link className="navLink" to="/services">
                  Services
                </Link>
                <Link className="navLink" to="/about">
                  About US
                </Link>
                <Link className="navLink" to="/contact">
                  Contact Us
                </Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

      <div className="mainContent">
        <div className="container">
          <Routes>
            <Route path="/" element={<Posts />} />
            <Route path="posts/:postId" element={<PostDetails />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default Header;
