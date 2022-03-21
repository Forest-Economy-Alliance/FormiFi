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
    "name": "Test60",
    "age": "29",
    "sex": "Male",
    "formName": "ISB Important Form",
    "form": {
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
    },
    "response": {},
    "submissionID": "ISB_Important_Form_Test60_7c3c1025261e4d077eb73f683f098c62203f429396587dfcdfdf8b9959105369"
}


*/

export function FormScreen({navigation, route}) {
  const {responseJSON} = route.params;
  const [progress, setProgress] = useState(0.0);

  const [formJSON, setFormJSON] = useState(responseJSON);

  function booleanInputCard(question) {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(!isEnabled);

    return (
      <View style={styles.queryCard}>
        <Text style={styles.queryCardText}>{question}</Text>
        <Switch
          trackColor={{false: '#9F9F9F', true: '#91B8E9'}}
          thumbColor={isEnabled ? '#1976D2' : '#FFFFFF'}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    );
  }

  const [sectionsList, setSectionsJSON] = useState(responseJSON.sections);
  alert(JSON.stringify(responseJSON, null, 2));

  function setFormJSONSections() {
    setFormJSON({...formJSON, sections: sectionsList});
  }

  function numericInputCard(question, placeholder) {
    const [value, setValue] = useState('');
    return (
      <View style={styles.queryCard}>
        <Text style={styles.queryCardText}>{question}</Text>
        <TextInput
          style={styles.queryCardInput}
          placeholder={placeholder}
          keyboardType="numeric"
          placeholderTextColor="#747474"
          onChangeText={text => setValue(text)}
        />
      </View>
    );
  }

  function textInputCard(question, placeholder) {
    const [value, setValue] = useState('');
    return (
      <View style={styles.queryCard}>
        <Text style={styles.queryCardText}>{question}</Text>
        <TextInput
          style={styles.queryCardInput}
          placeholder={placeholder}
          placeholderTextColor="#747474"
          onChangeText={text => setValue(text)}
        />
      </View>
    );
  }

  function dateInputCard(question) {
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);

    return (
      <View style={styles.queryCard}>
        <Text style={styles.queryCardText}>{question}</Text>
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

  function attachmentInputCard(question) {
    const [attachment, setAttachment] = useState(null);

    return (
      <View style={styles.queryCard}>
        <Text style={styles.queryCardText}>{question}</Text>
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

  function exportJSON() {
    const jsonString = JSON.stringify(formJSON, null, 4);
    const fileName = formJSON.form.formID + '.json';

    var path = FileSystem.ExternalDirectoryPath + '/forms/' + fileName;

    FileSystem.writeFile(path, jsonString, 'utf8').then(success => {
      alert('File written to ' + path);
    });
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
      <Text style={styles.title}>{responseJSON.form.formName}</Text>
      <Text style={styles.description}>
        {responseJSON.form.formDescription}
      </Text>
      <View>
        {/* {sectionsList.map((section, index) => (
          <View key={index}>
            <Text style={styles.sectionTitle}>{section.sectionTitle}</Text>
            {sectionsList.questions.map((question, index) => {
              switch (question.questionType) {
                case 'boolean':
                  return booleanInputCard(question.question);
                case 'numeric':
                  return numericInputCard(
                    question.question,
                    question.placeholder,
                  );
                case 'text':
                  return textInputCard(question.question, question.placeholder);
                case 'date':
                  return dateInputCard(question.question);
                case 'attachment':
                  return attachmentInputCard(question.question);
                default:
                  return null;
              }
            })}
          </View>
        ))}
        ) */}
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
    color: '#000000',
  },
  description: {
    fontSize: 15,
    textAlign: 'center',
    color: '#000000',
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
