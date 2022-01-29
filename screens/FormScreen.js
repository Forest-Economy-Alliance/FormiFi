import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Switch,
  Button,
  ScrollView,
} from 'react-native';

import DatePicker from 'react-native-date-picker';

import FileSystem from 'react-native-fs';
import DocumentPicker from 'react-native-document-picker';

export function FormScreen({navigation, route}) {
  const {responseJSON} = route.params;

  function booleanInputCard(form_element) {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(!isEnabled);

    return (
      <View style={styles.queryCard}>
        <Text style={styles.queryCardText}>{form_element}</Text>
        <Switch
          trackColor={{false: '#9F9F9F', true: '#91B8E9'}}
          thumbColor={isEnabled ? '#1976D2' : '#FFFFFF'}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    );
  }

  function numericInputCard(form_element) {
    const [value, setValue] = useState('');
    return (
      <View style={styles.queryCard}>
        <Text style={styles.queryCardText}>{form_element}</Text>
        <TextInput
          style={styles.queryCardInput}
          placeholder="Enter a number"
          keyboardType="numeric"
          placeholderTextColor="#747474"
          onChangeText={text => setValue(text)}
        />
      </View>
    );
  }

  function textInputCard(form_element) {
    const [value, setValue] = useState('');
    return (
      <View style={styles.queryCard}>
        <Text style={styles.queryCardText}>{form_element}</Text>
        <TextInput
          style={styles.queryCardInput}
          placeholder="Enter a string"
          placeholderTextColor="#747474"
          onChangeText={text => setValue(text)}
        />
      </View>
    );
  }

  function dateInputCard(form_element) {
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);

    return (
      <View style={styles.queryCard}>
        <Text style={styles.queryCardText}>{form_element}</Text>
        <Button
          style={styles.queryCardButton}
          color="#A68192"
          title="Pick a date"
          onPress={() => setOpen(true)}
        />
        <DatePicker
          modal
          open={open}
          date={date}
          mode="date"
          textColor="#fff"
          onConfirm={date => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </View>
    );
  }

  function attachmentInputCard(form_element) {
    const [attachment, setAttachment] = useState(null);

    return (
      <View style={styles.queryCard}>
        <Text style={styles.queryCardText}>{form_element}</Text>
        <Button
          style={styles.queryCardButton}
          color="#A68192"
          title="Attach"
          onPress={() => {
            DocumentPicker.pick({
              type: [DocumentPicker.types.allFiles],
              copyTo: 'documentDirectory',
            }).then(file => {
              setAttachment(file);
              let file_name = form[0].name;
              let file_path = form[0].uri;

              let dest_path =
                FileSystem.ExternalDirectoryPath + '/files' + '/' + file_name;

              FileSystem.copyFile(file_path, dest_path).then(() => {});
            });
          }}
        />
      </View>
    );
  }

  return (
    <ScrollView>
      <View>
        <Text>Form Screen</Text>
        {booleanInputCard('ELECTED THROUGH VOTING')}
        {numericInputCard('VOTES')}
        {textInputCard('NAME OF CANDIDATE')}
        {dateInputCard('DATE OF ELECTION')}
        {attachmentInputCard('ATTACHMENTS')}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEEDA',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  queryCard: {
    backgroundColor: '#EEEEDA',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    margin: 10,
    borderRadius: 20,
  },
  queryCardText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  queryCardInput: {
    color: '#000',
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    margin: 10,
    width: '100%',
    textAlign: 'center',
  },
  queryCardButton: {
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    margin: 10,
    width: '100%',
    textAlign: 'center',
  },
});
