import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Share } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import Title from "./Components/Title"
import Card from "./Components/Cards"
import ShareComp from "./Components/Share"
import Signup from "./Components/Signup"
import Login from "./Components/Login"
import { LogBox } from 'react-native';
import { Account } from "./Components/Account"
import AsyncStorage from '@react-native-async-storage/async-storage';
import Application from "./Components/Application"
import QuotesNavigator from "./Components/QuotesNavigator"
import MyQuotes from "./Components/MyQuotes"
import { RANDOM_USER_API } from "./Components/Constants";
import axios from 'axios';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();



export default function App() {
  const [loginOrSignup, setloginOrSignup] = useState("Login")
  const [LoggedIn, setLoggedIn] = useState(false)
  const [goToMyQuotes, setGoToMyQuotes] = useState()
  const [q, setq] = useState()
  const [quotes, setQuotes] = useState()
  const [cards, setCards] = useState([])
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('LoggedIn');

      setLoggedIn(value)
    } catch (error) {
      // Error retrieving data
    }
  };

  const shuffle = (array) => {
    var currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }
  useEffect(() => {
    // axios.get("https://type.fit/api/quotes").then(res => {
    //   let allCards = shuffle(res.data)
    //   setCards([...allCards])
    // })
    getData()
    const abortController = new AbortController();
    const signal = abortController.signal;
    fetch(RANDOM_USER_API, { signal: signal })
      .then(results => results.json())
      .then(data => {
        setUser(data);
      });
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  const SignMeUps = () => {
    setLoggedIn("true")
  }

  const logMeIn = () => {
    setLoggedIn("true")
  }

  const logMeOut = async () => {
    try {
      await AsyncStorage.setItem(
        'LoggedIn',
        "false"
      ).then(() => {
        setLoggedIn("false")
      })
    } catch (error) {
      // Error saving data
    }
  }
  const deleteListAfterLogout = async () => {
    try {
      await AsyncStorage.setItem(
        'quotesList',
        ""
      ).then(() => {
        setLoggedIn("false")
      })
    } catch (error) {
      // Error saving data
    }
  }
  const goToQuotes = (un) => {
    setGoToMyQuotes(true)
  }
  const goBackToApp = () => {
    setGoToMyQuotes(false)
  }

  return (
    < LinearGradient
      colors={['#145686', 'white', '#0D5680']}
      style={styles.container}
      start={{ x: 0, y: 0 }
      }
      end={{ x: 1, y: 1 }}
    >
      {
        LoggedIn === "true" ?
          goToMyQuotes === true ?
            <MyQuotes goBackToApp={() => goBackToApp()} /> :
            <View style={styles.container}>
              <Application
                sendAllQuotesFromApi={cards}
                goToMyQuotes={(un) => { goToQuotes(un) }}
                logMeOut={() => {
                  logMeOut()
                  deleteListAfterLogout()
                }}
              />
            </View> :
          <Account>
            {loginOrSignup === "Login" ?
              <Login goToSignup={(SU) => setloginOrSignup(SU)}
                logMeIn={() => { logMeIn() }}
              />
              :
              loginOrSignup === "Signup" ?
                <Signup goToLogin={(LI) => setloginOrSignup(LI)} SignMeUps={() => { SignMeUps() }} /> :
                console.log("mesh 3aref")
            }
          </Account>

      }

    </LinearGradient >

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
