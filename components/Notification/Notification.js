import {useSelector} from "react-redux";
import React, {useState, useEffect, useRef} from 'react';
import {Text, View, Button, Platform} from 'react-native';
import PushNotification from "react-native-push-notification";
import moment from "moment";

const LIMIT_EXPIRATION_IN_DAYS = 7;

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
    PushNotification.createChannel(
        {
            channelId: "gardeMangerChannel",
            channelName: "Garde Manger Channel"
        }
    )
    pushNotification(itemList)

    return null;
}

function getExpiredItem() {
    let itemList = []
    const items = useSelector((state) => state.gardeMangerReducer.items)

    for (let [key, value] of Object.entries(items)) {
        itemList.push({
            expiration_date: value.expiration_date,
            product: value.product_name
        })
    }
    return itemList
}

function pushNotification(itemList) {

    const today_date = moment(new Date(), 'DD-MM-YYYY')
    itemList.forEach(
        element => {

            const date_item = moment(new Date(element['expiration_date']), 'DD-MM-YYYY')
            const day_left = date_item.diff(today_date, 'days') + 1
            if (day_left < LIMIT_EXPIRATION_IN_DAYS) {
                PushNotification.localNotification(
                    {
                        channelId: "gardeMangerChannel",
                        title: "Expiration du produit " + element['product'],
                        message: day_left + " jours avant la date d'expiration"
                    }
                );
            }
        }
    )
}
export default Notification;