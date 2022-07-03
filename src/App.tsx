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
  Linking,
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
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import styled from 'styled-components';

import Config from 'react-native-config';

// import openURLInBrowser from 'react-native/Libraries/Core/Devtools/openURLInBrowser';

import {WebView} from 'react-native-webview';

import {useAsyncStorage} from '@react-native-async-storage/async-storage';

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
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
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
