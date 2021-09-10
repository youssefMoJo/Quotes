import React, { useState, useRef, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Animated, View, Text } from "react-native";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { set } from "react-native-reanimated";

const AnimatedIcon = Animated.createAnimatedComponent(FontAwesome);

export default function Like(props, { item, style }) {
    const scale = useRef(new Animated.Value(1)).current;
    const opacity = useRef(new Animated.Value(1)).current;
    const reverseOpacity = useRef(new Animated.Value(0)).current;
    const [liked, setLiked] = useState(false);
    const [username, setUsername] = useState()
    const [err, setErr] = useState("")
    const [isAdded, setIsAdded] = useState([60, 83])
    const [quotes, setQuotes] = useState()
    const [currentQuote, setCurrentQuote] = useState("")
    const [q, setQ] = useState()

    useEffect(() => {
        // console.log(props.quote.text)
        // setTimeout(() => {
        setCurrentQuote(props.quote.text)
        let y = props.quote.text !== currentQuote
        if (y) {
            like(false)
        }

        // }, 1000);


    })


    const updateQuotes = async () => {
        try {
            const q = props.quote.text
            var first = q.replace(/[^\p{L}\p{N}\p{Z}]/gu, '')
            var quoteID = first.split(' ').join('')
            const un = await AsyncStorage.getItem('quotesList')
            const qu = JSON.parse(un)
            delete qu[quoteID]
            seveDataInLocalStorage(qu)
            DislikeQuote(qu)
            setQuotes({ ...qu })
        } catch (error) {
            // Error retrieving data
        }
    }


    const LikeQuote = () => {

        axios({
            method: 'post',
            url: 'https://gl3g5obiga.execute-api.us-east-1.amazonaws.com/Dev/quotes',
            data: {
                "username": username,
                "quotes": [
                    {
                        "text": props.quote.text,
                        "author": props.quote.author
                    }
                ]
            }
        }).then(res => {
            if (res.data === "faild") {
                // setErr("true")

            } else {
                seveDataInLocalStorage({ ...res.data.Item.quotes })
                // setErr("false")
                setQ(props.quote)
            }
        })
    }

    const seveDataInLocalStorage = async (quotes) => {
        const quotesStringfied = JSON.stringify(quotes)
        try {
            await AsyncStorage.setItem(
                'quotesList',
                quotesStringfied
            )
            setQuotes({ ...quotes })
        } catch (error) {
            // Error saving data
        }
    }
    const DislikeQuote = (quotes) => {
        axios({
            method: 'delete',
            url: "https://gl3g5obiga.execute-api.us-east-1.amazonaws.com/Dev/quotes",
            data: {
                "Item": {

                    "quotes": { ...quotes },

                    "Username": username,


                }
            }
        }).then((res) => {
            // seveDataInLocalStorage({ ...res.data.Item.quotes })
        })


    }

    const getData = async () => {

        try {
            const un = await AsyncStorage.getItem('username')
            setUsername(un)

        } catch (error) {
            // Error retrieving data
        }

    };


    getData()
    const like = (value) => {
        Animated.sequence([
            Animated.timing(scale, {
                toValue: 0.9,
                duration: 30,
                useNativeDriver: true,
            }),
            Animated.timing(scale, {
                toValue: 1.2,
                duration: 70,
                useNativeDriver: true,
            }),
            Animated.timing(scale, {
                toValue: 0.9,
                duration: 30,
                useNativeDriver: true,
            }),
            Animated.parallel([
                Animated.timing(scale, {
                    toValue: 1,
                    duration: 70,
                    useNativeDriver: true,
                }),
                Animated.timing(value ? opacity : reverseOpacity, {
                    toValue: 0,
                    duration: 30,
                    useNativeDriver: true,
                }),
                Animated.timing(value ? reverseOpacity : opacity, {
                    toValue: 1,
                    duration: 30,
                    useNativeDriver: true,
                }),
            ]),
        ]).start();
        setLiked(value);
    };

    return (
        <View >
            {/* <View>
                {err === "true" ?
                    <Text style={{
                        color: "white",
                        borderRadius: 50,
                        paddingRight: 10,
                        paddingLeft: 10,
                        paddingBottom: 3,
                        backgroundColor: "#b30000",
                    }}>This quote is in your list </Text> :
                    err === "false" ?
                        <Text style={{
                            color: "white",
                            borderRadius: 50,
                            paddingRight: 10,
                            paddingLeft: 10,
                            paddingBottom: 3,
                            backgroundColor: "green",
                        }}>This quote is added to your list</Text> :
                        null
                }
            </View> */}

            <View style={{ marginLeft: err === "true" ? isAdded[0] : err === "false" ? isAdded[1] : 0 }}>
                <AnimatedIcon
                    name={"heart"}
                    size={50}
                    style={{
                        ...style,
                        position: "absolute",
                        opacity: reverseOpacity,
                        transform: [{ scale }],
                    }}
                    color="#B00000"
                    onPress={() => {
                        like(!liked)
                    }}

                />
                <AnimatedIcon
                    name={"heart-o"}
                    size={50}
                    style={{
                        ...style,
                        opacity: opacity,
                        transform: [{ scale }],
                    }}
                    color="black"
                    onPress={() => {
                        like(!liked)
                        if (!liked) {
                            LikeQuote()
                        } else {
                            updateQuotes()
                        }
                    }}
                />
            </View>
        </View>
    );
};