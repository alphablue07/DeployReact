import React, { Component } from "react";
import { authFirebase } from "../../config/firebase";
import Navbar from "../../components/layout/nav/Navbar";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'


import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { registerUser2 } from "../../action/fb_database";

const auth = authFirebase;

class Register extends Component {
  state = {
    name: "",
    username: "",
    email: "",
    password: "",
    city: "",
    social_media: "",
  };

  handleChangeField = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        registerUser2(
          res.user.uid,
          this.state.name,
          this.state.username,
          res.user.email,
          this.state.city,
          this.state.social_media
        );
        sendEmailVerification(res.user)
          .then(() => {
            localStorage.setItem('jwt-token', res.user.accessToken)
            localStorage.setItem('UID', res.user.uid)
            alert("Mohon verifikasi email anda");
            window.location.href = "/";
          })
          .catch((error) => {
            alert(error.message);
          });
      })
      .catch((err) => {
        alert(err.message);
      })
    
  };
  render() {
    // const { name, username, email, password, city, social_media } = this.state;
    return (
      <div>
      <Navbar bgColor="#4A4A5C" />
      <Container className="vw-100 vh-100">
      <div className="row">
        <div className="col-lg-5 mt-5">
        <h1 className="mt-5">Sign Up</h1>  
        <Form className="mt-3"  onSubmit={this.handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="email" placeholder="Enter email" onChange={this.handleChangeField} name="email"  />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control type="password" placeholder="Password" onChange={this.handleChangeField} name="password"  />
          </Form.Group>
          <Form.Group className="mb-3" controlId="name">
            <Form.Control placeholder="name" onChange={this.handleChangeField} name="name"  />
          </Form.Group>
          <Form.Group className="mb-3" controlId="username">
            <Form.Control placeholder="username" onChange={this.handleChangeField} name="username" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="city">
            <Form.Control placeholder="city" onChange={this.handleChangeField} name="city"  />
          </Form.Group>
          <Form.Group className="mb-3" controlId="social_media">
            <Form.Control placeholder="social media" onChange={this.handleChangeField} name="social_media"  />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form> 
        </div>
      </div>
    </Container>
      </div>
    );
  }
}

export default Register;
