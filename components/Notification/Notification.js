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

    const itemList = getExpiredItem();

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
                    await pushNotification(itemList)
                }}
            />
        </View>
    )
}

function getExpiredItem(){
    let itemList = []
    const items = useSelector((state) => state.gardeMangerReducer.items)

    for (let [key, value] of Object.entries(items)) {

        itemList.push({
            expiration_date:value.expiration_date,
            product: value.product_name
        })
    }
    return itemList
}

async function pushNotification(itemList) {

    itemList.forEach(
        element => PushNotification.localNotification(
            {
                channelId: "gardeMangerChannel",
                title: element['product'],
                message: element['expiration_date']
            }
        )
    )
}



export default Notification;