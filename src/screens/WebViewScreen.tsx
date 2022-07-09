import React, {useCallback} from 'react';
import {Alert, Linking, Text, TouchableOpacity} from 'react-native';

import styled from 'styled-components';

import Config from 'react-native-config';

// import openURLInBrowser from 'react-native/Libraries/Core/Devtools/openURLInBrowser';

import {WebView} from 'react-native-webview';

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

export default function Content() {
  let href = Config.URL;
  return (
    <>
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
