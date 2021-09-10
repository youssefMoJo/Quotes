import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import axios from 'axios';
import SwipeCards from 'react-native-swipe-cards';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Like from "./Like"

class Card extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.card}>
                <Text style={styles.noMoreCardsText}>{this.props.text}</Text>
                <Icon style={styles.icon} name="book" size={40} />
                <Text style={styles.noMoreCardsText}><Text>"</Text>
                    {this.props.author === null ? "Anonymous" : this.props.author}
                    <Text>"</Text></Text>
                <View>
                    <Like
                        quote={this.props} />
                </View>
            </View>
        )
    }
}

export default class extends React.Component {
    state = {
        cards: [],

    }

    shuffle = (array) => {
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


    componentDidMount() {
        axios.get("https://type.fit/api/quotes").then(res => {
            let test = this.shuffle(res.data)


            this.setState({ cards: [...test] }, () => {
            })

        })
    }

    sendingCard = (cardData) => {
        this.props.cardDetails(cardData)

    }

    render() {

        return (
            <SwipeCards
                cards={this.state.cards}
                // renderCard={(cardData) => <Card {...cardData} />}
                renderCard={(cardData) => {
                    this.sendingCard(cardData)
                    return <Card {...cardData} />
                }

                }
                showYup={false}
                showNope={false}

            />

        )
    }
}



const styles = StyleSheet.create({
    card: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 350,
        height: 350,
        borderRadius: 50,
        backgroundColor: "white",
        borderWidth: 2,
        borderColor: 'gray',
        marginTop: -40

    },
    noMoreCardsText: {
        fontSize: 18,
        textAlign: "center",
        margin: 20,
    },

})

