import { authFirebase } from "../config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { getDataUser } from "./fb_database";

export const checkDataLogin = async (setIsLogin, setDataUser = () => { }, setDataUserInfo = () => { }) => {
    const uuid = await localStorage.getItem('UID');
    if (uuid == null) {
        setIsLogin(false)
    } else {
        setIsLogin(true)
        onAuthStateChanged(authFirebase, async (user) => {
            if (user) {
                setDataUser(user)
                setDataUserInfo(await getDataUser(user.uid))
            } else {
                setIsLogin(false)
            }
        })
    }
}

export const firebaseLogout = async () => {
    localStorage.setItem('jwt-token', null);
    localStorage.setItem('UID', null);
    signOut(authFirebase)
    console.log('Signed Out');

}