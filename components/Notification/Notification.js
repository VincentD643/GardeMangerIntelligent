import {useSelector} from "react-redux";
import React, {useState, useEffect, useRef} from 'react';
import {Text, View, Button, Platform} from 'react-native';
import PushNotification from "react-native-push-notification";

// Must be outside of any component LifeCycle (such as `componentDidMount`).
PushNotification.configure({

    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
        requestPermissions: Platform.OS === 'android'
    },

    requestPermissions: true,
});

const Notification = () => {


    useEffect(() => {
        PushNotification.createChannel(
            {
                channelId: "gardeMangerChannel",
                channelName: "Garde Manger Channel"
            }
        )
    }, [])

    return (
        <View>
            <Button
                title="Press to Send Notification"
                onPress={async () => {
                    await pushNotification()
                }}
            />
        </View>
    )
}

async function pushNotification() {
    //const expirationArray = getExpirationDate()
    for (let i = 0; i < 2; i++) {
        PushNotification.localNotification(
            {
                channelId: "gardeMangerChannel",
                title: "New Update",
                message: "Local test" + i
            }
        )
    }
}


function getExpirationDate() {

    return {
        sound: 'default',
        title: 'sdgsdhx',
        body: 'And dsgsdgsdgs!',
        data: {someData: 'asfa hasfasfgasgere'},
        channelId: 'default',
        priority: 'high',
        to: expoPushToken,
    }
}

export default Notification;