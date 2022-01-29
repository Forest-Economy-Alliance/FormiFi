import React from 'react';

import {Button, View, Text, ImageBackground} from 'react-native';

import FileSystem from 'react-native-fs';

export function HomeScreen({navigation}) {
  FileSystem.mkdir(FileSystem.ExternalDirectoryPath + '/forms');
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f7f7f7',
      }}>
      <ImageBackground
        source={require('../assets/images/formifi-bg.png')}
        style={{width: '100%', height: '100%', flex: 1}}>
        <Text
          style={{
            color: '#8D917B',
            fontFamily: 'PlayfairDisplay',
            fontSize: 70,
            width: '100%',
            textAlign: 'center',
            marginTop: '30%',
            marginBottom: '95%',
          }}>
          Formifi
        </Text>
        <View
          style={{
            paddingHorizontal: '30%',
            paddingVertical: 10,
            width: '100%',
          }}>
          <Button
            title="User Login"
            color="#8D917B"
            onPress={() => navigation.navigate('UserLogin')}
          />
        </View>
        <View
          style={{
            paddingHorizontal: '30%',
            paddingVertical: 10,
            width: '100%',
          }}>
          <Button
            title="Admin Login"
            color="#8D917B"
            onPress={() => navigation.navigate('AdminLogin')}
          />
        </View>
      </ImageBackground>
    </View>
  );
}
