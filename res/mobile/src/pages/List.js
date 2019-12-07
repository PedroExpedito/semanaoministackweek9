import React, {useState, useEffect,} from "react"
import { Alert, View, Text, AsyncStorage, Image, StyleSheet, ScrollView, TouchableOpacity,} from "react-native"

import socketio from "socket.io-client"

import logo from "../assets/eagle.png"
import SpotList from "../components/SpotList"
export default function List({ navigation }) {
    const [techs, setTechs] = useState([])

    useEffect(() => {
        AsyncStorage.getItem("user").then(user_id => {
            const socket = socketio("http://192.168.0.108:3333", {
                query: { user_id }
            })
            socket.on("booking_response", booking => {
                Alert.alert(`sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? "aprovada" : "rejeitada"}`)
            })
        })
    }, [])
    

    
    async function removeItemValue() {
        try {
          await AsyncStorage.removeItem("user");
          handleNavigate()
          return true;
        }
        catch(exception) {
          return false;
        }  
      }
    function handleNavigate() {
        navigation.navigate("Login")
    }

    useEffect(() => {
        AsyncStorage.getItem("techs").then(storagedTechs => {
            const techsArray = storagedTechs.split(",").map(tech => tech.trim())
            setTechs(techsArray)
        })
    },[])
    return <View style={styles.container}>
        <Image style={styles.logo} source={logo}></Image>
        <ScrollView>
        {techs.map(tech => <SpotList key={tech} tech={tech}/>)}
        
        </ScrollView>

        <TouchableOpacity onPress={() => removeItemValue()} style={styles.button}><Text>Sair</Text></TouchableOpacity>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logo: {
        height: 128,
        width: 128,
        resizeMode: "contain",
        alignSelf: "center",
        marginTop: 32,
    },
    button: {
        height: 32,
        backgroundColor: "gray",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 2,
    },
})