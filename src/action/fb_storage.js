import { useEffect, useState } from "react"
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { getDownloadURL, uploadBytes, ref, deleteObject } from "firebase/storage"
import { getStorage } from 'firebase/storage'
import { updateProfileImg } from "./fb_database";

const auth = getAuth();
const storage = getStorage();

// initialize

// export const uploadProfileImg = async (fileObject) => {
//     const imgRef = storageRef(storage, `profile_img/${fileObject.name}`)
//     const snapshot = await uploadBytes(imgRef, fileObject)
//     const url = await getDownloadURL(imgRef)
//     console.log(url)
//     return url
//   }

export function useAuth(){
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
    return unsub;
  }, [])
  return currentUser
}

export async function deletePhoto(currentUser){
  const fileRef = ref(storage, currentUser.uid + '.jpg');
  deleteObject(fileRef)
}


export async function upload(file,currentUser){

      const fileRef = ref(storage, currentUser.uid + '.png');
      const snapshot = await uploadBytes(fileRef,file);
      const photoURL = await getDownloadURL(fileRef);
      updateProfileImg(currentUser,photoURL)
      updateProfile(currentUser, {photoURL});
      alert('photo profile updated!')
}

// const data = new FormData()
// data.append("file", file)
// data.append("upload_preset", "highlightVid")
// data.append("cloud_name", "dd5oonydb")

// const fileRef = await fetch("https://api.cloudinary.com/v1_1/dd5oonydb/video/upload", {
//       method: "post",
//       body: data
//   })
//   .then((res) => res.json())
//   .then((data) => {
//     set(ref(storage, `${currentUser.uid}/UserProfile/vidProfile`), {vidUrl: data.url})
//   })