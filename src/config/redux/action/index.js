import { registerUser2 } from "../../../action/fb_database";
import { createUserWithEmailAndPassword,  sendEmailVerification, } from "firebase/auth";

const registerUserAPI = (data) => (dispatch) => {
    return(
      createUserWithEmailAndPassword(data.email,data.password)
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
    )
}