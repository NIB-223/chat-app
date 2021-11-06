// import Button from '@restart/ui/esm/Button';
import React, { Component } from 'react';
import { View, ImageBackground, TextInput, StyleSheet, Button, Image, Text } from 'react-native';



export default class Start extends React.Component {
    constructor(props) {
        super(props);
        this.state = { text: '' };
    }

    render() {
        return (
            <ImageBackground style={styles.background} source={require('../assets/BackgroundImage.png')} resizeMode="cover">
                <Text style={styles.appTitle}>{this.state.text}</Text>
                <View style={styles.container2}>
                    <View style={styles.container3}>
                        <View>
                            <Image style={styles.icon}
                                source={require("../assets/icon.svg")}
                                size={14}
                            />

                            {/*user enters their name*/}
                            <TextInput style={styles.nameInput}
                                onChangeText={(text) => this.setState({ text })}
                                value={this.state.text}
                                placeholder=' Your Name'
                            />
                        </View>
                        <Text>Choose Background Color:</Text>
                        <View style={styles.circleContainer}>

                        </View>
                        {/* takes user to chat room*/}
                        <Button
                            color='#FFFFFF'
                            backgroundColor='#757083'
                            style={styles.chatButton}
                            title="Start Chatting"
                            onPress={() =>
                                this.props.navigation.navigate('Chat', { name: this.state.name })
                            }
                        />
                    </View>
                </View >
            </ImageBackground >

        )
    }
}

const styles = StyleSheet.create({
    container2: {
        justifyContent: 'center',
        alignItems: 'center',
        display: "flex",
        backgroundColor: "white",
        height: "44%",
        width: "88%",
    },
    container3: {
        justifyContent: 'center',
        alignItems: 'center',
        display: "flex",
        backgroundColor: "white",
        width: "88%",
    },
    nameInput: {
        borderColor: 'gray',
        borderWidth: 1,
        height: 60,
        width: 300,
        fontSize: 16,
        fontWeight: '300',
        opacity: 50,
        color: '#757083',
    },
    chatButton: {
        fontWeight: '600',
        fontSize: 16,
        color: '#FFFFFF',
        backgroundColor: '#757083',
        borderColor: '#757083',
    },
    background: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    appTitle: {
        fontSize: 45,
        fontWeight: '600',
        color: "#FFFFFF",
    },
    icon: {
        position: "absolute",
        top: 45,
        left: 15,
    },
    circleContainer: {
        display: "flex",
    },
    circle1: {
        flex: 25,
        width: 50,
        borderRadius: 25
    },
    circle2: {
        flex: 25,
        width: 50,
        borderRadius: 25
    },
    circle3: {
        flex: 25,
        width: 50,
        borderRadius: 25
    },
    circle4: {
        flex: 25,
        width: 50,
        borderRadius: 25
    }
})