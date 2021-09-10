import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import Button from 'react-native-button';
import GradientButton from 'react-native-gradient-buttons';
import UserPool from '../src/UserPool';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Signup(props) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [err, setError] = useState(false)
    const [errT, setErrorT] = useState("")
    const goToLogin = () => {
        props.goToLogin("Login")
    }
    const SignMeUp = () => {
        props.SignMeUps()
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
    const submitingSignup = () => {
        UserPool.signUp(username, password, [], null, (err, data) => {
            if (err) {
                setError(true)
                if (err.message.search("Password") === 0) {
                    setErrorT("Password should be at least 6 numbers")
                } else if (err.message.search("exists") !== 0) {
                    setErrorT(err.message)
                } else {
                    setErrorT("Please fill all the required fields")

                }

            } else {
                setError(false)
                setUsername("")
                setPassword("")
                storeData()
                SignMeUp()
                storeUsername(username)
                // console.log(data)
            }
        })
    }

    return (
        <View>
            <Text style={styles.title}>SignUp</Text>




            <View style={styles.card}>

                <Text style={styles.text}>Username </Text>
                <TextInput style={styles.input}
                    placeholder="Username without any apaces"
                    value={username}
                    onChangeText={(event) => setUsername(event)}
                >
                </TextInput>



                <Text style={styles.text}> Password </Text>

                <TextInput style={styles.input}
                    placeholder="6 numbers at least "
                    keyboardType="numeric"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(event) => setPassword(event)}
                >

                </TextInput>

                <GradientButton
                    style={{ marginVertical: 8 }}
                    text="Signup"
                    textStyle={{ fontSize: 20 }}
                    gradientBegin="#008099"
                    gradientEnd="#008099"
                    gradientDirection="diagonal"
                    height={40}
                    width={300}
                    radius={50}
                    impact
                    impactStyle='Light'
                    onPressAction={() => submitingSignup()}
                >
                </GradientButton>
                {err ?
                    <Text style={{ color: "white", borderRadius: 50, paddingRight: 10, paddingLeft: 10, paddingBottom: 3, backgroundColor: "#b30000" }}>
                        {errT}
                    </Text>
                    : console.log("")
                }
                <View >
                    <Text >Already got an account?

                    </Text>
                    <Button style={styles.button} onPress={() => goToLogin()}> Login</Button>
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
        fontSize: 14,
        fontWeight: "bold",
    }
})