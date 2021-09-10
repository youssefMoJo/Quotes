import React from "react"
import { StyleSheet, Text, View, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function Title() {
    return (
        <View style={{ flexDirection: "row" }}>
            <Text style={styles.titleStyle}>
                Quotes
            </Text>
            <Icon style={styles.icon} name="comment" size={70} />
        </View>
    )
}

const styles = StyleSheet.create({
    titleStyle: {
        color: "black",
        fontSize: 70,
        marginTop: 70,
    },
    icon: {
        marginTop: 75,
        marginLeft: 10,
        color: "white",
    }
})