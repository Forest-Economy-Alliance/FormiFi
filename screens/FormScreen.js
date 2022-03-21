import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Switch,
  Button,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';

import DatePicker from 'react-native-date-picker';
import FileSystem from 'react-native-fs';
import DocumentPicker from 'react-native-document-picker';
import * as Progress from 'react-native-progress';

/*

{
  "formID": 123456789,
  "formName": "Important ISB Form",
  "formDescription": "This is an important form",
  "nSections": 2,
  "sections": [
    {
      "sectionName": "A super cool section",
      "nQuestions": 3,
      "questions": [
        {
          "question": "What is your name?",
          "questionType": "text",
          "questionRequired": true,
          "questionPlaceholder": "Enter your name",
          "userResponse": ""
        },
        {
          "question": "What is your age?",
          "questionType": "number",
          "questionRequired": true,
          "questionPlaceholder": "Enter your age",
          "userResponse": ""
        },
        {
          "question": "What is your favorite color?",
          "questionType": "text",
          "questionRequired": true,
          "questionPlaceholder": "Enter your favorite color",
          "userResponse": ""
        }
      ]
    },
    {
      "sectionName": "Another super cool section",
      "nQuestions": 1,
      "questions": [
        {
          "question": "What is your name?",
          "questionType": "text",
          "questionRequired": true,
          "questionPlaceholder": "Enter your name",
          "userResponse": ""
        }
      ]
    }
  ]
}


*/

export function FormScreen({navigation, route}) {
  const {responseJSON} = route.params;
  const [progress, setProgress] = useState(0.0);

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

  function renderProgressBars(N) {
    let progress_bars = [];

    for (let i = 0; i < N; i++) {
      progress_bars.push(
        <TouchableWithoutFeedback
          onPress={() => {
            setProgress((progress + 0.1) % 1.0);
          }}
          onLongPress={() => {
            // jump to that form
          }}>
          <View style={styles.progressBarInner}>
            <Progress.Bar
              progress={Math.random()}
              width={50}
              height={50}
              borderRadius={4}
              animationConfig={{
                duration: 500,
              }}
              color="#A68192"
            />
          </View>
        </TouchableWithoutFeedback>,
      );
    }
    return progress_bars;
  }

  function renderForm() {
    form_types = ['boolean', 'numeric', 'text', 'date', 'attachment'];
    form_render = [];

    for (let i = 0; i < 10; i++) {}

    return form_render;
  }

  return (
    <ScrollView>
      {/* <View>
        <View style={styles.progressBar}>{renderProgressBars(5)}</View>
        <View style={styles.progressBar}>{renderProgressBars(5)}</View>
      </View>
      <ScrollView>
        {booleanInputCard('ELECTED THROUGH VOTING')}
        {numericInputCard('VOTES')}
        {textInputCard('NAME OF CANDIDATE')}
        {dateInputCard('DATE OF ELECTION')}
        {attachmentInputCard('ATTACHMENTS')}
      </ScrollView> */}
      <Text style={styles.title}>{responseJSON.formName}</Text>
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
  progressBar: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    flex: 1,
    flexDirection: 'row',
  },
  progressBarInner: {
    paddingHorizontal: 10,
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
