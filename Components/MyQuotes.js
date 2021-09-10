import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EachQuote from "./EachQuote"
import axios from 'axios';
import Button from 'react-native-button';

export default class MyQuotes extends React.Component {
    state = {
        data: [],
        username: "",
        IDsQuotesToDelete: []
    }

    componentDidMount() {
        this.getQuotes(false)
        this.username()
    }

    username = async () => {
        try {
            const un = await AsyncStorage.getItem('username')
            this.setState({ username: un })
        } catch (error) {
            // Error retrieving data
        }
    };

    getQuotes = async (update, IDsQuotesToDelete) => {

        try {
            const un = await AsyncStorage.getItem('quotesList')
            const qu = JSON.parse(un)

            if (update) {
                IDsQuotesToDelete.map((item) => {
                    delete qu[item]
                })
                this.seveDataInLocalStorage(qu)
                this.updateQuotes(qu)
                this.setState({ IDsQuotesToDelete: [] })

            }
            const quotesArr = []
            for (const p in qu) {
                quotesArr.push(qu[p])
            }
            this.setState({ data: quotesArr })




        } catch (error) {
            // Error retrieving data
        }
    }


    seveDataInLocalStorage = async (quotes) => {
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
    updateQuotes = (quotes) => {
        axios({
            method: 'delete',
            url: "https://gl3g5obiga.execute-api.us-east-1.amazonaws.com/Dev/quotes",
            data: {
                "Item": {

                    "quotes": { ...quotes },

                    "Username": this.state.username,



                }
            }
        }).then((res) => {
            seveDataInLocalStorage({ ...res.data.Item.quotes })
        })


    }
    removeAQuote = (q, save) => {
        if (save["remove"] === "true") {
            const quotesToDelete = [...this.state.IDsQuotesToDelete]
            const first = q.replace(/[^\p{L}\p{N}\p{Z}]/gu, '')
            const quoteID = first.split(' ').join('')
            quotesToDelete.push(quoteID)

            this.setState({ IDsQuotesToDelete: quotesToDelete }, (() => {

            }))
        } else if (save["addAgain"] === "true") {
            const quotesToDelete = [...this.state.IDsQuotesToDelete]
            const first = q.replace(/[^\p{L}\p{N}\p{Z}]/gu, '')
            const quoteID = first.split(' ').join('')
            const i = this.state.IDsQuotesToDelete.indexOf(quoteID)
            if (i > -1) {
                quotesToDelete.splice(i, 1);
            }
            this.setState({ IDsQuotesToDelete: quotesToDelete }, (() => {

            }))
        } else if (save) {
            this.getQuotes(true, this.state.IDsQuotesToDelete)

        }

    }
    goBack = () => {
        this.props.goBackToApp()
    }
    render() {

        return (
            <View>
                <Text style={{ ...styles.title, marginLeft: this.state.data.length === 0 ? 30 : 65 }}>My Quotes</Text>
                <ScrollView>
                    {this.state.data.map((item, index) => {
                        return (
                            <EachQuote
                                removeAQuote={(q) => { this.removeAQuote(q, { "remove": "true", "addAgain": "false" }) }}
                                addAgain={(q) => { this.removeAQuote(q, { "remove": "false", "addAgain": "true" }) }}
                                key={index} author={item.author} text={item.text} />
                        )

                    })}


                </ScrollView>
                <View style={{ width: 300 }}>
                    <Button style={{
                        color: "white",
                        backgroundColor: "green",
                        borderWidth: 1.5,
                        borderRadius: 50,
                        padding: 10,
                        fontWeight: "bold",
                        margin: 7,
                        marginLeft: this.state.data.length === 0 ? 13 : 75

                    }}
                        onPress={() => {
                            this.goBack()
                            this.removeAQuote(false, true)
                        }}

                    > Go Back</Button>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    title: {
        fontSize: 50,
        marginTop: 50
    }
})