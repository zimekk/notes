import React from 'react';
import {Button, StatusBar, Text, useColorScheme} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export default function HomeScreen({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Text>{JSON.stringify({isDarkMode}, null, 2)}</Text>
      <Button
        title="AnimatedScreen"
        onPress={() => navigation.navigate('AnimatedScreen')}
      />
      <Button
        title="AudioScreen"
        onPress={() => navigation.navigate('AudioScreen')}
      />
      <Button
        title="NotificationsScreen"
        onPress={() => navigation.navigate('NotificationsScreen')}
      />
      <Button
        title="StorageScreen"
        onPress={() => navigation.navigate('StorageScreen')}
      />
      <Button
        title="WebViewScreen"
        onPress={() => navigation.navigate('WebViewScreen')}
      />
    </SafeAreaView>
  );
}
