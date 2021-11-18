import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import firebase from 'firebase'

export default class CustomActions extends React.Component {
    //getting photos from library
    pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        try {
            if (status === 'granted') {
                //images from library
                let pickedImage = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                }).catch((error) => console.log(error.message))

                //uploads image to db, then to chat
                if (!pickedImage.cancelled) {
                    const imageUrl = await this.uploadImage(pickedImage.uri)
                    this.props.onSend({ image: imageUrl })
                }
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    //take photo on device
    takePhoto = async () => {
        // get camera permission
        const { status } = await ImagePicker.requestCameraPermissionsAsync()

        try {
            if (status === 'granted') {
                //load camera and wait for photo to be taken
                let cameraImage = await ImagePicker.launchCameraAsync({
                    allowsEditing: true,
                }).catch((error) => console.log(error.message))

                //upload image to db, then send to chat
                if (!cameraImage.cancelled) {
                    const imageUrl = await this.uploadImage(cameraImage.uri)
                    this.props.onSend({ image: imageUrl })
                }
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    //uploads images to db
    uploadImage = async (imageUrl) => {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError("Network request failed"))
            };
            xhr.responseType = "blob";
            xhr.open("GET", imageUrl, true);
            xhr.send(null);
        });

        const ref = firebase.storage().ref().child(`images/${new Date()}`);
        const snapshot = await ref.put(blob);
        blob.close();
        return await snapshot.ref.getDownloadURL()
    }

    getLocation = async () => {
        // get location permission
        const { status } = await Location.requestForegroundPermissionsAsync()

        try {
            if (status === 'granted') {
                //get current location
                const location = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.Balanced,
                }).catch((error) => {
                    console.error(error)
                })

                if (location) {
                    //send location params to the chat page as a new chat message
                    this.props.onSend({
                        location: {
                            longitude: location.coords.longitude,
                            latitude: location.coords.latitude,
                        },
                    })
                }
            }
        } catch (error) {
            console.error(error)
        }
    }

    //the menu of the plus button
    onActionPress = () => {
        const options = ['Choose From Library', 'Take Picture', 'Send Location', 'Cancel'];
        const cancelButtonIndex = options.length - 1;
        this.context.actionSheet().showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
            },
            async (buttonIndex) => {
                switch (buttonIndex) {
                    case 0:
                        return this.pickImage();
                    case 1:
                        return this.takePhoto();
                    case 2:
                        return this.getLocation()
                    default:
                        return
                }
            },
        );
    };

    render() {
        return (
            <TouchableOpacity
                accessible={true}
                accessibilityLabel="Actions list"
                accessibilityHint="Choose between sending geolocation, taking photo or choosing image"
                accessibilityRole="button"
                style={[styles.container]} onPress={this.onActionPress}>
                <View style={[styles.wrapper, this.props.wrapperStyle]}>
                    <Text style={[styles.iconText, this.props.iconTextStyle]}>+</Text>
                </View>
            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        width: 26,
        height: 26,
        marginLeft: 10,
        marginBottom: 10,
    },
    wrapper: {
        borderRadius: 13,
        borderColor: '#b2b2b2',
        borderWidth: 2,
        flex: 1,
    },
    iconText: {
        color: '#b2b2b2',
        fontWeight: 'bold',
        fontSize: 16,
        backgroundColor: 'transparent',
        textAlign: 'center',
    },
});

//defines actionsheet props as a function
CustomActions.contextTypes = {
    actionSheet: PropTypes.func,
};
