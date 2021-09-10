import React, { useState, useContext, useEffect } from "react"
import { StyleSheet, Text, View, TextInput } from 'react-native';
import Button from 'react-native-button';
import GradientButton from 'react-native-gradient-buttons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AccountContext } from "./Account";
import axios from 'axios';

export default function Login(props) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const { authenticate } = useContext(AccountContext);
    const [err, setError] = useState(false)

    const goToSignup = () => {
        props.goToSignup("Signup")
    }




    const storeData = async () => {
        try {
            await AsyncStorage.setItem(
                'LoggedIn',
                "true"
            )
        } catch (error) {
            // Error saving data
        }
    };


    logMeIn = () => {
        props.logMeIn()
    }

    const storeUsername = async (username) => {
        try {
            await AsyncStorage.setItem(
                'username',
                username
            )
        } catch (error) {
            // Error saving data
        }
    }
    const storeQuotes = async () => {
        axios.get(`https://gl3g5obiga.execute-api.us-east-1.amazonaws.com/Dev/quotes/${username}`).then(res => {
            seveDataInLocalStorage(res.data.Item.quotes)

        })
    }

    const seveDataInLocalStorage = async (quotes) => {
        const quotesStringfied = JSON.stringify(quotes)
        try {
            await AsyncStorage.setItem(
                'quotesList',
                quotesStringfied
            )
        } catch (error) {
            // Error saving data
        }
    }
    const submitingLogin = () => {
        authenticate(username, password)
            .then((data) => {
                // console.log("Logged in!", data);
                setUsername("")
                setPassword("")
                setError(false)
                storeData()
                storeUsername(username)
                logMeIn()
                storeQuotes()
            })
            .catch((err) => {
                // console.error("Failed to login", err);
                setError(true)
            });


    }

    return (
        <View>
            <Text style={styles.title}>Login</Text>

            <View style={styles.card}>

                <Text style={styles.text}>Username </Text>
                <TextInput style={styles.input}
                    placeholder="Username"
                    value={username}
                    onChangeText={(event) => setUsername(event)}
                ></TextInput>

                <Text style={styles.text}> Password </Text>
                <TextInput style={styles.input}
                    placeholder="Password"
                    keyboardType="numeric"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(event) => setPassword(event)}
                ></TextInput>


                <GradientButton
                    style={{ marginVertical: 8 }}
                    text="Login"
                    textStyle={{ fontSize: 20 }}
                    gradientBegin="#008099"
                    gradientEnd="#008099"
                    gradientDirection="diagonal"
                    height={40}
                    width={300}
                    radius={50}
                    impact
                    impactStyle='Light'
                    onPressAction={() => submitingLogin()}
                />
                {err ?
                    <Text style={{ color: "white", borderRadius: 50, paddingRight: 10, paddingLeft: 10, paddingBottom: 3, backgroundColor: "#b30000" }}>Incorrect username or password</Text>
                    : console.log("")
                }

                <View >
                    <Text >Don't have an account?

                    </Text>
                    <Button style={styles.button} onPress={() => goToSignup()}> Signup</Button>
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        justifyContent: "center",
        alignItems: 'center',
        width: 350,
        borderRadius: 50,
        borderWidth: 2.5,
        borderColor: 'gray',
        height: "70%",
        marginTop: "35%"

    },
    title: {
        position: "absolute",
        marginTop: 60,
        fontSize: 40
    },
    input: {
        borderColor: "black",
        width: "85%",
        borderRadius: 50,
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderTopWidth: 0,
        padding: 10,
    },
    text: {
        fontSize: 15,
        color: "black",
        fontWeight: "bold"
    },
    button: {
        fontSize: 15,
        fontWeight: "bold",
    }
})