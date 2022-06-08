import React from 'react';
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  Text,
  View,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Icon} from './Icon';
import {FastImageExamples, DefaultImageGrid, FastImageGrid} from './Screens';

// const {width} = Dimensions.get('screen');

// const Tab = createBottomTabNavigator<BottomTabParams>();

const Tab = createBottomTabNavigator();

function HomeScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator> */}
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen
          name="FastImage Example"
          component={FastImageExamples}
          options={{
            tabBarIcon: props => (
              <Icon name="ios-information-circle" {...props} />
            ),
          }}
        />
        <Tab.Screen
          name="Image Grid"
          component={DefaultImageGrid}
          options={{
            tabBarIcon: props => <Icon name="image-outline" {...props} />,
          }}
        />
        <Tab.Screen
          name="FastImage Grid"
          component={FastImageGrid}
          options={{
            tabBarIcon: props => <Icon name="images-outline" {...props} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
  },
});

export default App;
