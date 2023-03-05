/* eslint-disable no-restricted-globals */
import React, { useState, useEffect} from "react";
import Navbar from "../../components/layout/nav/Navbar";
import Footer from "../../components/layout/footer/Footer";
import {
  Form,
  Container,
  Button,
} from "react-bootstrap";
import { checkDataLogin } from "../../action/autentication";
import { halamanGameVerifikasi } from "../../action/games";
import { useAuth } from "../../action/fb_storage.js"
import { updateProfile2 } from "../../action/fb_database";

export default function UpdateProfile(){
      halamanGameVerifikasi();
      const currentUser = useAuth();

      const [profile, setProfile] = useState();
      const [name, setName] = useState('')
      const [username, setUsername] = useState('')
      const [city, setCity] = useState('')
      const [social_media, setSocialmedia] = useState('')

      // function handleChange(e){
      //   setName({[e.target.name] : e.target.value})
      //   setUsername({[e.target.name] : e.target.value})
      //   setCity({[e.target.name] : e.target.value})
      //   setSocialmedia({[e.target.name] : e.target.value})
      // }

      function handleClick(){
        updateProfile2(currentUser.uid,name,username,city,social_media)
      }

      const setDataUser = (dataUser)=>{
        // console.log("Data User", dataUser)
        setProfile(dataUser)
      } 
      

      useEffect(() => {
          checkDataLogin( setDataUser, setProfile)
      }, []);      
    return (
      <div style={{ backgroundColor: "#2B2D33", color: "#fff" }}>
        <Navbar bgColor="#4A4A5C" />
        <Container
          fluid
          className="mt-5 vw-100 vh-120"
          style={{ padding: "10vh 10vh", backgroundColor: "#3E4552" }}
        >
        <div className="row">
          <div className="col-5">
              <Form onSubmit={handleClick}>
                <Form.Group className="mb-3" controlId="full-name">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control id="fullname" type="plaintext" onChange={(e) => setName(e.target.value)} placeholder={profile?.name} name="name"></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>username</Form.Label>
                  <Form.Control  type="plaintext" onChange={(e) => setUsername(e.target.value)} placeholder={profile?.username}  name="username"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="City">
                  <Form.Label>City</Form.Label>
                  <Form.Control type="plaintext"  onChange={(e) => setCity(e.target.value)} placeholder={profile?.city} name="city"></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="Social-Media">
                  <Form.Label>Social Media</Form.Label>
                  <Form.Control type="plaintext" onChange={(e) => setSocialmedia(e.target.value)} placeholder={profile?.social_media} name="social_media"></Form.Control>
                </Form.Group>
                <Button type="submit" className="btn btn-primary me-3" >
                  Update
                </Button>
              </Form>
            </div>
        </div>
        </Container>
        <Footer />
      </div>
    );
  }

