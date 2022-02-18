//import {useSelector} from "react-redux";
import React, {useState, useEffect, useRef} from 'react';
import {Text, View, Button, Platform} from 'react-native';
import Constants from 'expo-constants'
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});
const Notification = () => {

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();


    useEffect(() => {

        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
            setNotification(notification);
            console.log(notification)
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    const message = getExpirationDate(expoPushToken)
    return (
        <View>
            <Text>Your expo push token: {expoPushToken}</Text>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text>Title: {notification && notification.request.content.title} </Text>
                <Text>Body: {notification && notification.request.content.body}</Text>
                <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
            </View>
            <Button
                title="Press to Send Notification"
                onPress={async () => {
                    await sendPushNotification(expoPushToken,message);
                    //await schedulePushNotification();
                }}
            />
        </View>
    )
}


function getExpirationDate(expoPushToken){
    return{
        sound: 'default',
        title: 'sdgsdhx',
        body: 'And dsgsdgsdgs!',
        data: {someData: 'asfa hasfasfgasgere'},
        channelId:'default',
        priority:'high',
        to: expoPushToken,
    }
}

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.dev/notifications
async function sendPushNotification(expoPushToken,message) {

    await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    });
    // console.log(JSON.stringify(message))
}

async function registerForPushNotificationsAsync() {
    let token;
    if (!Constants.isDevice) {
        return Promise.reject('Must use physical device for Push Notifications');
    }

    const status = (await Notifications.requestPermissionsAsync()).status
    if (status !== "granted") {
        return Promise.reject("Failed to push token")
    }
    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            showBadge: true,
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }
    token = (await Notifications.getExpoPushTokenAsync()).data
    console.log(token)
    return token;
}


export default Notification;