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
      // eslint-disable-next-line no-unused-vars
      const snapshot = await uploadBytes(fileRef,file);
      const photoURL = await getDownloadURL(fileRef);
      updateProfileImg(currentUser,photoURL)
      updateProfile(currentUser, {photoURL});
      alert('photo profile updated!')
}