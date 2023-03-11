
import React, { useState,useEffect } from "react";
import Navbar from "../../components/layout/nav/Navbar";
// import Footer from "../../components/layout/footer/Footer";
// import { MDBTypography } from 'mdb-react-ui-kit';
import {
  Form,
  Container,
  Card,
  Button
} from "react-bootstrap";

import "./styles.css";
import { checkDataLogin } from "../../action/autentication";
import { halamanGameVerifikasi } from "../../action/games";
import { getLeaderBoard } from "../../action/games";
// import { useAuth,upload } from "../../config/firebase";
import { useAuth,upload } from "../../action/fb_storage";
import { VideoUploader } from "../../components"

const Profiles = (props) => {
      halamanGameVerifikasi();
      const dataUser = [];
      const currentUser = useAuth();
      const [photo, setPhoto] = useState(null);
      const [photoURL, setphotoURL] = useState("https://spesialis1.orthopaedi.fk.unair.ac.id/wp-content/uploads/2021/02/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg");
      const [imageSrc, setImageSrc] = useState();
      
      // function handleChange(e) {
      //   if (e.target.files[0]) {
      //     setPhoto(e.target.files[0])
      //   }
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

      function handleClick(){
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


      const [dataList, setDataList] = useState([]);
      // const [isLogin, setIsLogin] = useState(false);
      const [profile, setProfile] = useState();
      
      const setDataUser = (dataUser)=>{
        }       
        const setDataUserDetail = (dataUser) =>{
          setProfile(dataUser)
      }
      // const files = document.getElementById('profileSubmit');

      // function handleChange(e){
      //   files.className = 'mt-1 disabled btn btn-primary me-3';
      //   files.textContent = 'Waiting for input...'
      //   if(e.target.files[0]){
      //     setPhoto(e.target.files[0])
      //     files.textContent = 'Save Changes'
      //     files.className = 'mt-1 btn btn-primary me-3'
      //   }
      // }

      
      const getData = async () => {
        const data_new = await getLeaderBoard(10)
        setDataList(data_new)
        console.log(data_new)
    }

    dataList.forEach((elem) => {
      if(elem.id_player === currentUser.uid){
        const score = elem.score;
        dataUser.push(score)
      }
    })
      useEffect(() => {
          checkDataLogin( setDataUser, setDataUserDetail, setProfile)
      }, []);
      
      

      useEffect(() => {
        getData()
    }, []);

      return (
        
        <div style={{ backgroundColor: "#2B2D33", color: "#fff" }}>
          <Navbar bgColor="#4A4A5C" />
          <Container
            fluid
            className="mt-5 vw-100 vh-100"
            style={{ padding: "10vh 10vh", backgroundColor: "#3E4552" }}
          >
            <div className="row">
              <div className="col-3">
              <Card className="bg-dark" style={{ width: '100%' }}>
                <Card.Header style={{backgroundImage: `url(${photoURL})`, width: "100%", height: "200px", backgroundRepeat: "no-repeat", backgroundSize: "cover"}}/>
              </Card>    
              
                <Card className="text-dark mt-4 col-6 offset-3 bg-warning">
                  <Card.Header as="h5" className="text-center text-dark">Game Score</Card.Header>
                  <Card.Text className="text-center">{dataUser}</Card.Text>
                </Card>
              
              </div>
              <div className="col-lg-5 offset-0">
                  <Form.Group className="mb-3" controlId="name">
                    <Form.Label>full name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={profile?.name}
                      aria-label="Disabled input example"
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="username">
                    <Form.Label>username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={profile?.username}
                      aria-label="Disabled input example"
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="City">
                    <Form.Label>city</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={profile?.city}
                      aria-label="Disabled input example"
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="Social-Media">
                    <Form.Label>social media</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={profile?.social_media}
                      aria-label="Disabled input example"
                      readOnly
                    />
                  </Form.Group>
                  <Button href="profiles/update" className="btn btn-primary me-3">Here, Update Your Profile Data !
                  </Button>
                  
              </div>
              <div className="col-lg-3 offset-0">
                  <VideoUploader/>
              </div>

            </div>
          </Container>

          <Container>
          </Container>

        </div>
      );
}  

export default Profiles;
