import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Button, StatusBar, StyleSheet, Text} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import AnimatedScreen from '../screens/AnimatedScreen';
import AudioScreen from '../screens/AudioScreen';
import HomeScreen from '../screens/HomeScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import StorageScreen from '../screens/StorageScreen';
import WebViewScreen from '../screens/WebViewScreen';

const Profile = HomeScreen;

function Settings({navigation}) {
  return (
    <SafeAreaView style={[styles.container, {backgroundColor: '#6a51ae'}]}>
      <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
      <Text style={{color: '#fff'}}>Light Screen</Text>
      <Button
        title="Next screen"
        onPress={() => navigation.navigate('EditPost')}
        color="#fff"
      />
    </SafeAreaView>
  );
}

function EditPost({navigation}) {
  return (
    <SafeAreaView style={[styles.container, {backgroundColor: '#ecf0f1'}]}>
      <StatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />
      <Text>Dark Screen</Text>
      <Button
        title="Next screen"
        onPress={() => navigation.navigate('Profile')}
      />
    </SafeAreaView>
  );
}

const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Tabs}
            options={{headerShown: false}}
          />
          <Stack.Screen name="EditPost" component={EditPost} />
          <Stack.Screen name="AnimatedScreen" component={AnimatedScreen} />
          <Stack.Screen name="AudioScreen" component={AudioScreen} />
          <Stack.Screen
            name="NotificationsScreen"
            component={NotificationsScreen}
          />
          <Stack.Screen name="StorageScreen" component={StorageScreen} />
          <Stack.Screen name="WebViewScreen" component={WebViewScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
