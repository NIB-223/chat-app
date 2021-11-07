// import Button from '@restart/ui/esm/Button';
import React, { Component } from "react";
import {
    View,
    ImageBackground,
    TextInput,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
} from "react-native";


export default class Start extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: '', background: "" };
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground style={styles.background}
                    source={require('../assets/BackgroundImage.png')}
                    resizeMode="cover"
                >
                    <Text style={styles.appTitle}>{this.state.text}</Text>

                    <View style={styles.contentBox}>
                        <View style={styles.textContainer}>
                            <Image style={styles.icon}
                                source={require("../assets/icon.svg")}
                                size={14}
                            />

                            {/*user enters their name, this sets the state of the name*/}
                            <TextInput style={styles.nameInput}
                                onChangeText={(text) => this.setState({ name: text })}
                                value={this.state.text}
                                placeholder=' Your Name'
                            />
                        </View>

                        {/*user touches a button for color, we set the background state to that color*/}
                        <View>
                            <Text style={styles.colorText}>Choose Background Color:</Text>
                            <View style={styles.backgroundColorChoices}>
                                <TouchableOpacity
                                    accessibilityLabel="Change background color to black."
                                    accessibilityHint="Lets you change the background in the chat room to black."
                                    accessibilityRole="button"
                                    style={styles.circle1}
                                    onPress={() => this.setState({ background: "#090C08" })}
                                />
                                <TouchableOpacity
                                    accessibilityLabel="Change background color to purple."
                                    accessibilityHint="Lets you change the background in the chat room to dark purple."
                                    accessibilityRole="button"
                                    style={styles.circle2}
                                    onPress={() => this.setState({ background: "#474056" })}
                                />
                                <TouchableOpacity
                                    accessibilityLabel="Change background color to blue."
                                    accessibilityHint="Lets you change the background in the chat room to dark blue."
                                    accessibilityRole="button"
                                    style={styles.circle3}
                                    onPress={() => this.setState({ background: "#8A96A5" })}
                                />
                                <TouchableOpacity
                                    accessibilityLabel="Change background color to green."
                                    accessibilityHint="Lets you change the background in the chat room to light green."
                                    accessibilityRole="button"
                                    style={styles.circle4}
                                    onPress={() => this.setState({ background: "#B9C6AE" })}
                                />
                            </View>
                        </View>

                        {/* takes user to chat room, pass the name and background as props*/}
                        <TouchableOpacity
                            accessibilityLabel="Go to chatroom."
                            accessibilityHint="Takes the user to the chatroom."
                            accessibilityRole="button"
                            color='#FFFFFF'
                            backgroundColor='#757083'
                            style={styles.chatButton}
                            title="Start Chatting"
                            onPress={() =>
                                this.props.navigation.navigate('Chat', {
                                    name: this.state.name,
                                    background: this.state.background,
                                })
                            }
                        >
                            <Text style={styles.buttonText}>Start Chatting</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground >
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        position: "relative",
    },
    contentBox: {
        flex: 1,
        height: "44%",
        backgroundColor: "#ffffff",
        width: "88%",
        alignItems: "center",
        justifyContent: "space-evenly",
        position: "absolute",
        bottom: 20,
    },
    nameInput: {
        borderColor: "gray",
        borderWidth: 1,
        height: 60,
        width: 300,
        fontSize: 16,
        fontWeight: "300",
        opacity: 50,
        color: "#757083",
    },
    chatButton: {
        width: "78%",
        height: 55,
        backgroundColor: "#757083",
        color: "#ffffff",
        alignItems: "center",
        fontWeight: "bold",
        justifyContent: "space-evenly",
        width: "88%",
    },
    background: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-end",
    },
    appTitle: {
        fontSize: 45,
        fontWeight: "600",
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
        backgroundColor: "#090C08",
        width: 50,
        height: 50,
        borderRadius: 25,
        margin: 7,
    },
    circle2: {
        backgroundColor: "#474056",
        width: 50,
        borderRadius: 25,
        margin: 7,
    },
    circle3: {
        backgroundColor: "#8A95A5",
        width: 50,
        borderRadius: 25,
        margin: 7,
    },
    circle4: {
        backgroundColor: "#B9C6AE",
        width: 50,
        borderRadius: 25,
        margin: 7,
    },
    backgroundColorChoices: {
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    buttonText: {
        color: "#ffffff",
        fontWeight: "bold",
    },
});