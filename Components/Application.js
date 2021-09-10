import React, { Component, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ShareComp from "./Share"
import Card from "./Cards"
import Title from "./Title"
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Application(props) {
    const [data, setData] = useState()
    const [username, setUsername] = useState()
    const cardData = (e) => {
        setTimeout(() => {
            setData(e)

        }, 0);
    }
    const goToMyQuotes = (un) => {
        props.goToMyQuotes(un)
        // axios.get(`https://gl3g5obiga.execute-api.us-east-1.amazonaws.com/Dev/quotes/${username}`).then(res => {
        //     console.log(res.data.Item.quotes)

        // })
    }
    const getData = async () => {
        try {
            const un = await AsyncStorage.getItem('username')
            setUsername(un)
        } catch (error) {
            // Error retrieving data
        }
    };
    const logMeOut = () => {
        props.logMeOut()
    }
    getData()

    return (

        < View style={styles.container} >

            <Title />
            <Card data={data} sendAllQuotesFromApi={props.sendAllQuotesFromApi} cardDetails={(e) => { cardData(e) }} />
            <ShareComp
                data={data}
                goToMyQuotes={(un) => { goToMyQuotes(un) }}
                logMeOut={() => { logMeOut() }}
            />

        </View >
    )

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
});
