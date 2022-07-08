/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  Button,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

// import Video from 'react-native-video';

import SoundPlayer from 'react-native-sound-player';

import {
  AirplayButton,
  showRoutePicker,
  useAirplayConnectivity,
  useAvAudioSessionRoutes,
  useExternalPlaybackAvailability,
} from 'react-airplay';

import styled from 'styled-components';

import Config from 'react-native-config';

// import openURLInBrowser from 'react-native/Libraries/Core/Devtools/openURLInBrowser';

import {WebView} from 'react-native-webview';

import {useAsyncStorage} from '@react-native-async-storage/async-storage';

import PushNotificationIOS from '@react-native-community/push-notification-ios';

function AirplayScreen() {
  const isExternalPlaybackAvailable = useExternalPlaybackAvailability({
    useCachedValue: false,
  });
  const isAirplayConnected = useAirplayConnectivity();
  const routes = useAvAudioSessionRoutes();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <Video
        source={{
          uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        }}
        style={styles.video}
        controls={true}
      /> */}
      <View>
        <Text>
          External playback available: {String(isExternalPlaybackAvailable)}
        </Text>
        <Text>Airplay connected: {String(isAirplayConnected)}</Text>
        <Text>Routes: {JSON.stringify(routes, null, 2)}</Text>
      </View>
      <View style={styles.box}>
        {Platform.OS === 'ios' && (
          <AirplayButton
            style={styles.button}
            prioritizesVideoDevices={false}
            tintColor="blue"
            activeTintColor="red"
          />
        )}
      </View>
      <View>
        <Button
          title="Custom Button"
          onPress={useCallback(
            () => showRoutePicker({prioritizesVideoDevices: false}),
            [],
          )}
        />
      </View>
    </ScrollView>
  );
}

function AudioScreen() {
  const [playing, setPlaying] = useState(false);

  const playSong = () => {
    try {
      // SoundPlayer.playSoundFile('engagementParty', 'm4a');
      SoundPlayer.playUrl(
        // 'https://radio.stream.smcdn.pl/icradio-p/2380-1.aac/playlist.m3u8'
        // 'https://stream.open.fm/100'
        'https://n-22-11.dcs.redcdn.pl/sc/o2/Eurozet/live/chillizet.livx',
      );
    } catch (e) {
      Alert.alert('Cannot play the file');
      console.log('cannot play the song file', e);
    }
  };

  const getInfo = async () => {
    // You need the keyword `async`
    try {
      const info = await SoundPlayer.getInfo(); // Also, you need to await this because it is async
      console.log('getInfo', info); // {duration: 12.416, currentTime: 7.691}
    } catch (e) {
      console.log('There is no song playing', e);
    }
  };

  useEffect(() => {
    const subscription = SoundPlayer.addEventListener(
      'FinishedLoading',
      ({success}) => {
        console.log('finished loading', success);
      },
    );

    return () => {
      subscription.remove();
    };
  });

  const onPressPlayButton = useCallback(() => {
    if (playing) {
      SoundPlayer.stop();
      setPlaying(false);
    } else {
      playSong();
      getInfo();
      setPlaying(true);
    }
  }, [playing]);
  return (
    <Button onPress={onPressPlayButton} title={playing ? 'Stop' : 'Play'} />
  );
}

function AnimatedStyleUpdateExample() {
  const randomWidth = useSharedValue(10);

  const config = {
    duration: 500,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const style = useAnimatedStyle(() => {
    return {
      width: withTiming(randomWidth.value, config),
    };
  });

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
      }}>
      <Animated.View
        style={[
          {width: 100, height: 80, backgroundColor: 'black', margin: 30},
          style,
        ]}
      />
      <Button
        title="toggle"
        onPress={() => {
          randomWidth.value = Math.random() * 350;
        }}
      />
    </View>
  );
}

const StyledText = styled(Text)`
  color: palevioletred;
`;

function Link({href, children, ...props}: any) {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(href);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(href).catch(() => null);
    } else {
      Alert.alert(`Don't know how to open this URL: ${href}`);
    }
  }, [href]);

  return (
    <TouchableOpacity
      accessibilityRole="button"
      // onPress={() => openURLInBrowser(href)}>
      onPress={handlePress}
      {...props}>
      <StyledText>{children}</StyledText>
    </TouchableOpacity>
  );
}

// https://react-native-async-storage.github.io/async-storage/docs/api/#useasyncstorage
function Storage() {
  const [value, setValue] = useState<string | null>('value');
  const {getItem, setItem} = useAsyncStorage('@storage_key');

  const readItemFromStorage = async () => {
    const item = await getItem();
    setValue(item);
  };

  const writeItemToStorage = async (newValue: string) => {
    await setItem(newValue);
    setValue(newValue);
  };

  useEffect(() => {
    readItemFromStorage();
  }, []);

  return (
    <TouchableOpacity
      onPress={() =>
        writeItemToStorage(Math.random().toString(36).substr(2, 5))
      }
      style={{
        alignSelf: 'center',
        margin: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: 'rgba(27,31,36,0.15)',
        borderStyle: 'solid',
        borderRadius: 6,
        backgroundColor: '#f6f8fa',
      }}>
      <StyledText>{value ? value : '-'}</StyledText>
    </TouchableOpacity>
  );
}

function Content() {
  let href = Config.URL;
  return (
    <>
      <Storage />
      <AirplayScreen />
      <AudioScreen />
      <AnimatedStyleUpdateExample />
      <Link
        href={href}
        style={{
          alignSelf: 'center',
          margin: 16,
          padding: 16,
          borderWidth: 1,
          borderColor: 'rgba(27,31,36,0.15)',
          borderStyle: 'solid',
          borderRadius: 6,
          backgroundColor: '#f6f8fa',
        }}>
        {href}
      </Link>
      <WebView
        source={{uri: href}}
        style={{
          height: 400,
        }}
      />
    </>
  );
}

const Section: React.FC<{
  children: React.ReactNode;
  title: string;
}> = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = () => {
  const [permissions, setPermissions] = useState({});
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const onRemoteNotification = notification => {
    const isClicked = notification.getData().userInteraction === 1;

    console.log(['onRemoteNotification'], {isClicked});

    if (isClicked) {
      // Navigate user to another screen
    } else {
      // Do something else with push notification
    }
  };

  // useEffect(() => {
  //   const type = 'notification';
  //   PushNotificationIOS.addEventListener(type, onRemoteNotification);
  //   return () => {
  //     PushNotificationIOS.removeEventListener(type);
  //   };
  // }, []);

  const onRegistered = deviceToken => {
    Alert.alert('Registered For Remote Push', `Device Token: ${deviceToken}`, [
      {
        text: 'Dismiss',
        onPress: null,
      },
    ]);
  };

  const onRegistrationError = error => {
    Alert.alert(
      'Failed To Register For Remote Push',
      `Error (${error.code}): ${error.message}`,
      [
        {
          text: 'Dismiss',
          onPress: null,
        },
      ],
    );
  };

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

  const onLocalNotification = notification => {
    const isClicked = notification.getData().userInteraction === 1;

    Alert.alert(
      'Local Notification Received',
      `Alert title:  ${notification.getTitle()},
      Alert subtitle:  ${notification.getSubtitle()},
      Alert message:  ${notification.getMessage()},
      Badge: ${notification.getBadgeCount()},
      Sound: ${notification.getSound()},
      Thread Id:  ${notification.getThreadID()},
      Action Id:  ${notification.getActionIdentifier()},
      User Text:  ${notification.getUserText()},
      Notification is clicked: ${String(isClicked)}.`,
      [
        {
          text: 'Dismiss',
          onPress: null,
        },
      ],
    );
  };

  useEffect(() => {
    PushNotificationIOS.addEventListener('register', onRegistered);
    PushNotificationIOS.addEventListener(
      'registrationError',
      onRegistrationError,
    );
    PushNotificationIOS.addEventListener('notification', onRemoteNotification);
    PushNotificationIOS.addEventListener(
      'localNotification',
      onLocalNotification,
    );

    PushNotificationIOS.requestPermissions({
      alert: true,
      badge: true,
      sound: true,
      critical: true,
    }).then(
      data => {
        console.log('PushNotificationIOS.requestPermissions', data);
      },
      data => {
        console.log('PushNotificationIOS.requestPermissions failed', data);
      },
    );

    return () => {
      PushNotificationIOS.removeEventListener('register');
      PushNotificationIOS.removeEventListener('registrationError');
      PushNotificationIOS.removeEventListener('notification');
      PushNotificationIOS.removeEventListener('localNotification');
    };
  }, []);

  const showPermissions = () => {
    PushNotificationIOS.checkPermissions(permissions => {
      setPermissions({permissions});
    });
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        {/* <Header /> */}
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <View>
            <Button
              onPress={sendLocalNotificationWithSound}
              title="Send fake local notification with custom sound"
            />
            <Button
              onPress={scheduleLocalNotification}
              title="Schedule fake local notification"
            />
            <Button
              onPress={showPermissions}
              title="Show enabled permissions"
            />
            <Text>{JSON.stringify(permissions)}</Text>
          </View>
          <Content />
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  box: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    width: 100,
    height: 100,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
