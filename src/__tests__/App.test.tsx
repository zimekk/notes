import React from 'react';
import 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import App from '../App';

// Note: test renderer must be required after react-native.
import {act, create} from 'react-test-renderer';

it('renders correctly', async () => {
  await act(() => {
    create(<App />);
  });
  // expect(AsyncStorage.getItem).toBeCalledWith('@storage_key');
});
