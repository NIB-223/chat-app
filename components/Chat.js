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
            uid: 0,
            loggedInText: "Logging in..."
        }


        // References Firebase messages
        this.referenceChatMessages = firebase.firestore().collection('messages');

    }

    componentDidMount() {

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

        // calls the authentication service 
        this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                firebase.auth().signInAnonymously();
            }


            //contains system message welcoming user to chat
            this.setState({
                uid: user.uid,
                messages: [],
            });
            this.unsubscribe = this.referenceChatMessages
                .orderBy("createdAt", "desc")
                .onSnapshot(this.onCollectionUpdate);
        });
    }


    componentWillUnmount() {
        this.unsubscribe();
    }

    //retrieves current data in collection an makes it visible
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

    addMessage() {
        this.referenceChatMessages.add({
            _id: message._id,
            uid: this.state.uid,
            createdAt: message.createdAt,
            text: message.text || '',
            user: message.user,
        })
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
                <Text>{this.state.loggedInText}</Text>
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