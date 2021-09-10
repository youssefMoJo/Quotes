import React, { Component } from 'react';
import { StyleSheet, Text, View, Share, } from 'react-native';
import Slider from 'react-native-slide-to-unlock';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Button from 'react-native-button';
import GradientButton from 'react-native-gradient-buttons';
import Like from "./Like"
import AsyncStorage from '@react-native-async-storage/async-storage';

class ShareComp extends React.Component {

    onShare = async () => {
        try {
            const result = await Share.share({
                message: this.props.data.text + ` By: "${this.props.data.author === null ? "Anonymous" : this.props.data.author}"`
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    openMyQuotes = async () => {
        this.props.goToMyQuotes("dsa")
    }

    logMeOut = async () => {
        this.props.logMeOut()
        try {
            await AsyncStorage.setItem(
                'username',
                ""
            )
        } catch (error) {
            // Error saving data
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {/* <View>
                    <Like
                        quote={this.props.data} />
                </View> */}

                <View style={{ flexDirection: "row" }}>
                    <Button style={{
                        color: "white",
                        backgroundColor: "#8B0000",
                        borderWidth: 1,
                        borderRightWidth: 0,
                        borderBottomLeftRadius: 50,
                        borderTopLeftRadius: 50,
                        padding: 13,
                        width: 180,
                        fontWeight: "bold"

                    }}
                        onPress={() => { this.logMeOut() }}

                    > Logout</Button>

                    <Button
                        style={{
                            color: "white",
                            backgroundColor: "#228B22",
                            borderWidth: 1,
                            borderBottomRightRadius: 50,
                            borderTopRightRadius: 50,
                            padding: 13,
                            borderLeftWidth: 0,
                            width: 180,
                            fontWeight: "bold",
                        }}
                        onPress={() => { this.openMyQuotes() }}
                    > My Quotes</Button>


                </View>
                <Slider
                    childrenContainer={{ backgroundColor: 'red' }}
                    onEndReached={() => {
                        this.onShare()
                    }}
                    containerStyle={{
                        margin: 8,
                        backgroundColor: 'white',
                        borderRadius: 50,
                        overflow: 'hidden',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '95%'
                    }}
                    sliderElement={
                        <Icon style={styles.icon} name="arrow-circle-right" size={45} />

                    }
                >
                    <Text style={styles.sliderText}>{'SLIDE TO SHARE'}</Text>
                </Slider>

            </View >
        )

    }

}




const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 400,
    },
    sliderText: {
        color: "gray",
        backgroundColor: "white",
        fontSize: 20
    },
    icon: {
        margin: 4,
    },
    button: {
        fontSize: 15,
        fontWeight: "bold",
    }
});

export default ShareComp;