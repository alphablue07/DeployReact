import React, {useEffect, useState} from "react"
import { ref, set, child, get } from "firebase/database"
import { getAuth, onAuthStateChanged, } from "firebase/auth";
import { database } from "../../config/firebase";
import jwtDecode from "jwt-decode";

const auth = getAuth();

export function useAuth(){
    const [currentUser, setCurrentUser] = useState();
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
        return unsub;
      }, [])
      return currentUser
    }

export default function VideoUploader() {
    const [isVideo, setVideo] = useState("")
    // const [isUser, setUser] = useState("")
    // const [isUserId, setUserId] = useState("")
    const [isLoading, setLoading] = useState(false)
    
    const getUid = async()=>{
        return await localStorage.getItem("UID");
    }

    const authenticate = async () => {
        let storage = localStorage.getItem("accesstoken")
        if (storage === "" || storage === null){

        } else {
          let decode = jwtDecode(storage)
          const db = await get(child(ref(database),`${decode.user_id}/UserProfile/vidProfile`))
        //   setUser(decode.email)
        //   setUserId(decode.user_id)
          setVideo(db.val()?.vidUrl)
        }
      }

    const dataTable = async () => {
        try {
            let uuid_player = await getUid()
            // const db = await get(child(ref(database),`${isUser}/UserProfile/vidProfile`))
            const db = await get(child(ref(database),`/UserProfile/${uuid_player}/vidProfile`))
            const video = db?.val()
            setVideo(video?.vidUrl)
        } catch (error) {
            console.log(error);
        }
    }
    const submitVideo = async (e) => {
        setLoading(true)
        const video = e.target.files[0]
        const data = new FormData()
        data.append("file", video)
        data.append("upload_preset", "highlightVid")
        data.append("cloud_name", "dd5oonydb")

        let uuid_player = await getUid()

        // console.log('isUserId ==============>>>>>>>>>>',uuid)

        fetch("https://api.cloudinary.com/v1_1/dd5oonydb/video/upload", {
            method: "post",
            body: data
        })
            .then((res) => res.json())
            .then((data) => {
                // set(ref(database,`${isUserId}/UserProfile/vidProfile`), { vidUrl : data.url })
                set(ref(database,`/UserProfile/${uuid_player}/vidProfile`), { vidUrl : data.url })
                setLoading(false)
            }).catch((err) => {
                console.log(err);
                setLoading(false)
            })
    }
    useEffect(()=>{
        authenticate()
        dataTable()
    },[dataTable])
    
    return (
        <>
            <div className="container">
                <div className="d-flex justify-content-center">
                    <h2>Video Upload</h2>
                </div>
                <div className="container input-group d-flex justify-content-center">
                    <form className="mb-2">
                        <input 
                            type="file"
                            className="form-control" 
                            placeholder="Upload your file" 
                            onChange={(e) => {submitVideo(e)}}/>
                        <div className="input-group-append">
                            {isLoading ? 
                            <p>waiting for uploading</p>:
                            <p>upload your highlights!</p>
                            }
                        </div>
                    </form>
                    {isVideo &&
                     <video
                        width={360}
                        height={330}
                        muted
                        autoPlay
                        loop>
                             <source src={isVideo} type="video/mp4"/>
                    </video>
                    }
                </div>
            </div>
        </>
    )
}