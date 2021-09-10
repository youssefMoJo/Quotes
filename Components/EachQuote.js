import React, { Component, useState, useRef } from 'react';
import { StyleSheet, Text, View, Animated, Share } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from 'react-native-button';

const AnimatedIcon = Animated.createAnimatedComponent(FontAwesome);

export default function EachQuote(props, { item, style }) {
    const scale = useRef(new Animated.Value(1)).current;
    const opacity = useRef(new Animated.Value(1)).current;
    const reverseOpacity = useRef(new Animated.Value(0)).current;
    const [liked, setLiked] = useState(false);
    const onShare = async () => {
        try {
            const result = await Share.share({
                message: props.text + ` By: "${props.author === null ? "Anonymous" : props.author}"`
            });

        } catch (error) {
            alert(error.message);
        }
    };
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
    const removeAQuote = () => {
        props.removeAQuote(props.text)
    }
    const addAgain = () => {
        props.addAgain(props.text)
    }
    return (
        <View >


            <View style={styles.card}>

                <View style={styles.cardContent}>
                    <View style={styles.like}>
                        <View>
                            <AnimatedIcon
                                name={"heart-o"}
                                size={50}
                                style={{
                                    ...style,
                                    position: "absolute",
                                    opacity: reverseOpacity,
                                    transform: [{ scale }],

                                }}
                                color="black"
                                onPress={() => {
                                    like(!liked)
                                }}

                            />
                        </View>
                        <AnimatedIcon
                            name={"heart"}
                            size={50}
                            style={{
                                ...style,
                                opacity: opacity,
                                transform: [{ scale }],
                            }}
                            color="#B00000"
                            onPress={() => {
                                like(!liked)
                                if (!liked) {
                                    removeAQuote()
                                } else {
                                    addAgain()
                                }

                            }}
                        />
                        <Button style={{ marginTop: 5 }} onPress={() => {
                            onShare()
                        }}>Share</Button>

                    </View>

                    <View style={{ paddingRight: 70 }}>
                        <Text style={styles.text}>{props.text} </Text>
                        <Text style={styles.author}>"{props.author === null ? "Anonymous" : props.author}"</Text>
                    </View>

                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        width: 370,
        height: "auto",
        borderRadius: 100,
        backgroundColor: "white",
        borderWidth: 1.5,
        borderColor: 'black',
        marginTop: 10,
        borderTopWidth: 0,

    },

    text: {
        fontSize: 15,

    },
    author: {
        color: "green",
        fontWeight: "bold",
    },
    cardContent: {
        flexDirection: "row",
        padding: 20

    },
    like: {
        marginRight: 10,
        justifyContent: 'center',
    },



})
