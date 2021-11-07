import React from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import {
    View,
    Platform,
    KeyboardAvoidingView,
} from 'react-native';

// This import loads the firebase namespace.
import firebase from 'firebase/compat/app';
import 'firebase/auth';
import 'firebase/firestore';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries




// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDHernoUFx9iw02yxukpSuBQQeULr3Xqjs",
    authDomain: "chat-app-71127.firebaseapp.com",
    projectId: "chat-app-71127",
    storageBucket: "chat-app-71127.appspot.com",
    messagingSenderId: "298365903023",
    appId: "1:298365903023:web:7a616462527a8310edb45a"
};

//init db connection
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export default class Chat extends React.Component {
    constructor() {
        super();
        this.state = {
            messages: [],
        }
    }
    componentDidMount() {
        //
        this.referenceChatMessages = firebase.firestore().collection("messages");
        this.unsubscribe = this.referenceChatMessages.onSnapshot(this.onCollectionUpdate)
        //put  username in navigation bar (passes prop from start)
        const name = this.props.route.params.name;

        //change background color based on user's choice (prop passed from start)
        const background = this.props.route.params.background;
        this.props.navigation.setOptions({
            title: `Welcome ${name}`,
            headerStyle: {
                backgroundColor: `${background}`,
            },
            headerTintColor: "#212224",
        });


        //contains system message welcoming user to chat
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: 'Hello developer',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://placeimg.com/140/140/any',
                    },
                },
                {
                    _id: 2,
                    text: `Welcome to the chat, ${name}!`,
                    creeatedAt: new Date(),
                    system: true,
                },
            ]
        })
    }

    componentWillUnmount() {
        this.unsubscribe();
    }


    onCollectionUpdate = (querySnapshot) => {
        const messages = [];
        // go through each document
        querySnapshot.forEach((doc) => {
            // get the QueryDocumentSnapshot's data
            let data = doc.data();
            messages.push({
                _id: data._id,
                text: data.text,
                createdAt: data.createdAt.toDate(),
                user: data.user,
            });
        });
    }

    //allows messages to be sent/submitted
    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }));
    }
    //creates a bubble for the messagesa
    renderBubble(props) {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        background: 'linear-gradient(to right, #662121, #CF2C2C)'
                    },
                }}
            />
        );
    }

    render() {

        return (
            <View style={{ flex: 1 }}>
                {/* bubble around messages*/}
                <GiftedChat
                    renderBubble={this.renderBubble.bind(this)}
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    user={{
                        _id: 1,
                    }}
                />
                {/*Fixees android keyboard issue*/}
                {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
            </View>
        );
    }
}