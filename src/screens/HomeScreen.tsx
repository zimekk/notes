import React from 'react';
import {Button, StatusBar, Text, useColorScheme, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Svg, {Path} from 'react-native-svg';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import styled from 'styled-components';

const StyledView = styled(View)`
  padding: 20px;
  flex-direction: column;
  align-items: center;
  background-color: #355070;
`;

const StyledText = styled(Text)`
  color: #eaac8b;
`;

function Logo() {
  return (
    <Svg viewBox="0 0 8 8" width="100" height="100">
      <Path d="M0 0v8h4V3c0-3-2-3-4-3" fill="#6d597a" />
      <Path d="M4 0v8h4V3c0-3-2-3-4-3" fill="#b56576" />
    </Svg>
  );
}

export default function HomeScreen({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Text>{JSON.stringify({isDarkMode}, null, 2)}</Text>
      <StyledView>
        <Logo />
        <StyledText>Logo</StyledText>
      </StyledView>
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
