import React from 'react';
import { View, Text } from 'react-native';

export default class Chat extends React.Component {
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
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>Hello Screen2!</Text>
            </View>
        );
    }
}