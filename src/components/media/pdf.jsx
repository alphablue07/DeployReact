import { Document, Page, View, Text, PDFViewer, StyleSheet } from "@react-pdf/renderer";
import { useState, useEffect } from "react";
import { historyByUser } from "../../action/fb_database";
import { useAuth } from "../../action/fb_storage";

const styles = StyleSheet.create({
    body: {
        paddingTop: 20,
    }
})

const PDF = () => {
    const [dataHistory, getDataHistory] = useState([])
    let hist = []
    let playId = []
    let totalScore = 0

    const currentUser = useAuth()
    // const photo = currentUser?.photoURL
    console.log('current user data:', currentUser?.photoURL)

    dataHistory.forEach((e,i) => {
        let id_play = e.data.id_player.slice(0,7)
        let id_game = e.data.game_id.slice(0,10)
        console.log('here my id play :', id_play)
        if(i === 0){
            playId.push(id_play)
        }
        console.log('play id', playId)
        hist.push('Game - '+ [i+1], '\n Game_ID : ' + id_game ,'\n Score : ' +  e.data.score, '\n Time : ' + e.data.time, '\n\n')
        totalScore += e.data.score
        
    })


    console.log('total score :', totalScore)
    console.log('cek user :', currentUser)
    
    const getUserHistory = async  () => {
        let uid =  await localStorage.getItem('UID')
        let data =  await historyByUser(uid)
        getDataHistory(await data)

    }

    console.log('Data User History :', dataHistory)

    useEffect(() => {
        getUserHistory()
    },[])

    return(
        <Document>
            <Page size="A4"  style={styles.body}> 
                <View style={{display: 'flex', justifyContent: "center", flexDirection: "column"}}>
                        <Text style={{alignSelf: 'center', paddingBottom:'20px'}}>Account : {currentUser?.email}</Text>
                        <Text style={{paddingLeft: '30px', paddingBottom: '20px'}}>ID_Player : {playId}</Text>
                        <Text wrap={true} style={{alignSelf: "flex-start", paddingLeft: '30px'}}>
                            {hist}
                        </Text>
                        <Text style={{fontWeight: 'bold', alignSelf:'flex-end', paddingRight: '30px'}}>
                          Total Score : {totalScore}
                        </Text>
                </View>  
            </Page>
        </Document>
    )
}
const PDFView = () => {

    // eslint-disable-next-line no-unused-vars
    const [client, setClient] = useState(false)

    useEffect(() => {
        setClient(true)
    }, [])

    return(
    <PDFViewer style={{width: '100vw',height:'100vh'}}>
        <PDF/>
    </PDFViewer>
    )
}
export default PDFView