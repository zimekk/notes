import React, {useCallback, useEffect, useState} from 'react';
import {
  AirplayButton,
  showRoutePicker,
  useAirplayConnectivity,
  useAvAudioSessionRoutes,
  useExternalPlaybackAvailability,
} from 'react-airplay';
import {Alert, Button, Platform, ScrollView, Text, View} from 'react-native';
import SoundPlayer from 'react-native-sound-player';
import styled from 'styled-components';

const StyledAirplayButton = styled(AirplayButton)`
  width: 64;
  height: 64;
`;

function AirplayScreen() {
  const isExternalPlaybackAvailable = useExternalPlaybackAvailability({
    useCachedValue: false,
  });
  const isAirplayConnected = useAirplayConnectivity();
  const routes = useAvAudioSessionRoutes();

  return (
    <View>
      <View>
        <Text>
          External playback available: {String(isExternalPlaybackAvailable)}
        </Text>
        <Text>Airplay connected: {String(isAirplayConnected)}</Text>
        <Text>Routes: {JSON.stringify(routes, null, 2)}</Text>
      </View>
      <View style={{alignItems: 'center'}}>
        {Platform.OS === 'ios' && (
          <StyledAirplayButton
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
    </View>
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

export default function Content() {
  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <AudioScreen />
      <AirplayScreen />
    </ScrollView>
  );
}
