/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
import React, { useState, useEffect} from "react";
import Navbar from "../../components/layout/nav/Navbar";
import Footer from "../../components/layout/footer/Footer";
import {
  Form,
  Container,
  Button,
  Card
} from "react-bootstrap";
import { checkDataLogin } from "../../action/autentication";
import { halamanGameVerifikasi } from "../../action/games";
import { useAuth, upload } from "../../action/fb_storage.js"
import { updateProfile2 } from "../../action/fb_database";

export default function UpdateProfile(){
      halamanGameVerifikasi();
      const currentUser = useAuth();
      const dataUser = [];
      const [profile, setProfile] = useState();
      const [name, setName] = useState('')
      const [username, setUsername] = useState('')
      const [city, setCity] = useState('')
      const [social_media, setSocialmedia] = useState('')

      const [photo, setPhoto] = useState(null);
      const [photoURL, setphotoURL] = useState("https://spesialis1.orthopaedi.fk.unair.ac.id/wp-content/uploads/2021/02/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg");
      const [imageSrc, setImageSrc] = useState();
      // function handleChange(e){
      //   setName({[e.target.name] : e.target.value})
      //   setUsername({[e.target.name] : e.target.value})
      //   setCity({[e.target.name] : e.target.value})
      //   setSocialmedia({[e.target.name] : e.target.value})
      // }
      function handleOnChange(changeEvent) {
        const reader = new FileReader();
    
        reader.onload = function(onLoadEvent) {
          document.getElementById('preview').innerHTML = 'Preview'
          document.getElementById('preview').style.color = 'red'
          document.getElementById('preview').style.textAlign = 'left'
          document.getElementById('preview').style.lineHeight = '10px'
          setImageSrc(onLoadEvent.target.result);
        }
        
        if(changeEvent.target.files[0]){
          reader.readAsDataURL(changeEvent.target.files[0]);
          setPhoto(changeEvent.target.files[0])
        }
      }
      function handleClick2(){
        if(photo === null){
          alert(`can't upload empty data`)
        }else{
          upload(photo,currentUser)
        }
      }
      useEffect(() => {
        if(currentUser?.photoURL){
          setphotoURL(currentUser.photoURL)
        }
      }, [currentUser])

      function handleClick(){
        updateProfile2(currentUser.uid,name,username,city,social_media)
      }

      const setDataUser = (dataUser)=>{
        // console.log("Data User", dataUser)
        setProfile(dataUser)
      } 

      const setDataUserDetail = (dataUser) =>{
        // console.log("data user detail:", dataUser)
    }    

      useEffect(() => {
          checkDataLogin( setDataUserDetail, setDataUser, setProfile)
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
        <div className="col-3">
              <Card className="bg-dark" style={{ width: '100%' }}>
                <Card.Header style={{backgroundImage: `url(${photoURL})`, width: "100%", height: "200px", backgroundRepeat: "no-repeat", backgroundSize: "cover"}}/>
                <Card.Header id='preview' style={{backgroundImage: `url(${imageSrc})`, width: "100%", height: "200px", backgroundRepeat: "no-repeat", backgroundSize: "cover", textAlign:'center', lineHeight:'200px', fontWeight:'bold'}}> Image Preview Shown Here </Card.Header>
                <Card.Body style={{position: "relative"}}>
                <div style={{position: "absolute", top:"1px", left:"0" , right:"0", backgroundColor:"rgba(255,255,255,0.8)"}}>
                  <Form.Control onChange={handleOnChange} type="file" size="sm" />
                </div>
                </Card.Body>
              </Card>
              <Button className="mt-1" type="submit" onClick={handleClick2}>Save Changes</Button>     
              </div>
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
