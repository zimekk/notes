import PushNotificationIOS from '@react-native-community/push-notification-ios';
import React, {useState} from 'react';
import {Button, Text, View} from 'react-native';

export default function () {
  const [permissions, setPermissions] = useState({});

  const sendLocalNotificationWithSound = () => {
    PushNotificationIOS.addNotificationRequest({
      id: 'notificationWithSound',
      title: 'Sample Title',
      subtitle: 'Sample Subtitle',
      body: 'Sample local notification with custom sound',
      sound: 'customSound.wav',
      badge: 1,
    });
  };

  const scheduleLocalNotification = () => {
    PushNotificationIOS.scheduleLocalNotification({
      alertBody: 'Test Local Notification',
      fireDate: new Date(new Date().valueOf() + 2000).toISOString(),
    });
  };

  const showPermissions = () => {
    PushNotificationIOS.checkPermissions(permissions => {
      setPermissions({permissions});
    });
  };

  return (
    <View>
      <Button
        onPress={sendLocalNotificationWithSound}
        title="Send fake local notification with custom sound"
      />
      <Button
        onPress={scheduleLocalNotification}
        title="Schedule fake local notification"
      />
      <Button onPress={showPermissions} title="Show enabled permissions" />
      <Text>{JSON.stringify(permissions)}</Text>
    </View>
  );
}
