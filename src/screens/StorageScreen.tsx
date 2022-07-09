import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styled from 'styled-components';

const StyledText = styled(Text)`
  color: palevioletred;
`;

// https://react-native-async-storage.github.io/async-storage/docs/api/#useasyncstorage
export default function Storage() {
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
