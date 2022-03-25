import React, {useState} from 'react';

import {Button, View, Text, FlatList} from 'react-native';

import FileSystem from 'react-native-fs';

import Dialog from 'react-native-dialog';

export function DashboardScreen({navigation, route}) {
  var formsPaths = ['Forms'];
  var submissionsPaths = ['Submissions'];

  FileSystem.readDir(FileSystem.ExternalDirectoryPath + '/forms/').then(
    files => {
      for (let i = 0; i < files.length; i++) {
        formsPaths.push(files[i].name);
      }
    },
  );

  FileSystem.readDir(FileSystem.ExternalDirectoryPath + '/submissions/').then(
    files => {
      for (let i = 0; i < files.length; i++) {
        submissionsPaths.push(files[i].name);
      }
    },
  );

  function openFormsFile(fileName) {
    FileSystem.readFile(
      FileSystem.ExternalDirectoryPath + '/forms/' + fileName,
      'utf8',
    ).then(success => {
      alert(success);
    });
  }

  function openSubmissionsFolder(folderName) {
    FileSystem.readFile(
      FileSystem.ExternalDirectoryPath +
        '/submissions/' +
        folderName +
        '/' +
        'submission.json',
      'utf8',
    ).then(success => {
      alert(success);
    });
  }

  const [visible, setVisible] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  function handleAuthorize(code) {
    if (code == 2580) {
      setAuthorized(true);
      setVisible(false);
    }
  }

  function showSubmissions() {
    return (
      <View>
        <View>
          <FlatList
            data={formsPaths}
            renderItem={({item}) => (
              <View
                style={{
                  marginVertical: 10,
                  backgroundColor: '#A68192',
                  borderRadius: 10,
                  width: '100%',
                }}>
                <Button
                  title={item}
                  color="#A68192"
                  onPress={() => {
                    openFormsFile(item);
                  }}
                />
              </View>
            )}
            keyExtractor={item => item}
          />
        </View>
        <View>
          <FlatList
            data={submissionsPaths}
            renderItem={({item}) => (
              <View
                style={{
                  marginVertical: 10,
                  backgroundColor: '#8192A6',
                  borderRadius: 10,
                  width: '100%',
                }}>
                <Button
                  title={item}
                  color="#8192A6"
                  onPress={() => {
                    openSubmissionsFolder(item);
                  }}
                />
              </View>
            )}
            keyExtractor={item => item}
          />
        </View>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f7f7f7',
      }}>
      <View
        style={{
          marginHorizontal: 40,
          backgroundColor: '#f7f7f7',
        }}>
        <View>
          <Dialog.Container
            visible={visible}
            onBackdropPress={() => navigation.navigate('Home')}>
            <Dialog.Title>Authorization</Dialog.Title>
            <Dialog.Description>
              Enter your authorization code to view the submissions.
            </Dialog.Description>
            <Dialog.Input
              label="Code"
              keyboardType="numeric"
              onChangeText={text => handleAuthorize(text)}
            />
            <Dialog.Button
              label="Back"
              onPress={() => navigation.navigate('Home')}
            />
          </Dialog.Container>

          {authorized ? showSubmissions() : null}
        </View>
      </View>
    </View>
  );
}
