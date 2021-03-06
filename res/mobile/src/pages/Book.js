import React, {useState} from "react"
import { View, SafeAreaView, Text, AsyncStorage, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native"

import api from "../services/api"

export default function Book({ navigation }) {
    const [date, setDate] = useState("")
    const id = navigation.getParam("id")

    async function handleSubmit(){
        const user_id = await AsyncStorage.getItem("user")

        await api.post(`/spots/${id}/bookings`, {
            date
        }, {
            headers: { user_id }
        })
        Alert.alert("solicitado")

        navigation.navigate("List")
    }
    function handleCancel() {
        navigation.navigate("List")
    }

    return <View style={styles.container}>
        <Text style={styles.label}>Data para reserva?*</Text>
            <TextInput style={styles.input} 
                placeholder= "Qual data ?*"
                placeholderTextColor= "#999"
                //keyboardType="email-anddress"
                autoCapitalize="words"
                autoCorrect={false}
                value={date}
                onChangeText={setDate}
            />
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Solicitar Reserva</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
                <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            
        
    </View>
}

const styles = StyleSheet.create({
    container: {
        margin: 30,
        marginTop: 120,
    },
    label: {
        fontWeight: "bold",
        color: "#444",
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        paddingHorizontal: 20,
        fontSize: 16,
        color: "#444",
        height: 44,
        marginBottom: 20,
        borderRadius: 2,
    },
    button: {
        height: 42,
        backgroundColor: "gray",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 2,
    },
    cancelButton: {
        height: 42,
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 2,
        marginTop: 10,
    },
    buttonText: {
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 16,
    },
})