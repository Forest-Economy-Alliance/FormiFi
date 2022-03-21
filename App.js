import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {HomeScreen} from './screens/HomeScreen';
import {UserLoginScreen} from './screens/UserLoginScreen';
import {FormScreen} from './screens/FormScreen';
import {FormSelectorScreen} from './screens/FormSelectorScreen';
import {CreateFormScreen} from './screens/CreateFormScreen';
import {DashboardScreen} from './screens/DashboardScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UserLogin"
          component={UserLoginScreen}
          options={{
            title: 'User Login',
            headerStyle: {backgroundColor: '#DFD09C'},
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{
            title: 'Dashboard',
            headerStyle: {backgroundColor: '#DFD09C'},
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="FormSelector"
          component={FormSelectorScreen}
          options={{
            title: 'Form Selector',
            headerStyle: {backgroundColor: '#DFD09C'},
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="CreateForm"
          component={CreateFormScreen}
          options={{
            title: 'Create A Form',
            headerStyle: {backgroundColor: '#DFD09C'},
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="Form"
          component={FormScreen}
          options={{
            title: 'Form',
            headerStyle: {backgroundColor: '#DFD09C'},
            headerTitleAlign: 'center',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
