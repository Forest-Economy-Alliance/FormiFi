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

export function FormScreen({navigation, route}) {
  const [formJSON, setFormJSON] = useState(route.params.responseJSON);
  FileSystem.mkdir(
    FileSystem.ExternalDirectoryPath + '/submissions/' + formJSON.submissionID,
  );

  function exportSubmission() {
    var timeNow = new Date();
    var dateString =
      timeNow.getFullYear() +
      '-' +
      (timeNow.getMonth() + 1) +
      '-' +
      timeNow.getDate();
    var timeString =
      timeNow.getHours() +
      '-' +
      timeNow.getMinutes() +
      '-' +
      timeNow.getSeconds();

    var timeDate = dateString + '_' + timeString;

    formJSON.time = timeDate;
    setFormJSON(formJSON);

    const jsonString = JSON.stringify(formJSON, null, 2);
    const fileName = 'submission.json';

    var path =
      FileSystem.ExternalDirectoryPath +
      '/submissions/' +
      formJSON.submissionID +
      '/' +
      fileName;

    FileSystem.writeFile(path, jsonString, 'utf8').then(success => {
      alert('File written to ' + path);
    });
  }

  return (
    <ScrollView>
      <Text style={styles.title}>{formJSON.formName}</Text>
      <Text style={styles.description}>{formJSON.form.formDescription}</Text>

      <View style={styles.section}>
        {formJSON.form.sections
          ? formJSON.form.sections.map((section, sectionIndex) => {
              return (
                <View key={sectionIndex} style={styles.section}>
                  <Text style={styles.subtitle}>{section.sectionName}</Text>
                  {section.questions.map((question, questionIndex) => {
                    return (
                      <View key={questionIndex} style={styles.question}>
                        {question.questionType === 'text' ? (
                          <View style={styles.queryCard}>
                            <Text style={styles.queryCardText}>
                              {question.question}
                            </Text>
                            <TextInput
                              style={styles.queryCardInput}
                              placeholder={question.questionPlaceholder}
                              placeholderTextColor="#747474"
                              onChangeText={text => {
                                formJSON.form.sections[sectionIndex].questions[
                                  questionIndex
                                ].userResponse = text;
                                setFormJSON(formJSON);
                              }}
                            />
                          </View>
                        ) : question.questionType === 'number' ? (
                          <View style={styles.queryCard}>
                            <Text style={styles.queryCardText}>
                              {question.question}
                            </Text>
                            <TextInput
                              style={styles.queryCardInput}
                              placeholder={question.questionPlaceholder}
                              placeholderTextColor="#747474"
                              keyboardType="numeric"
                              onChangeText={text => {
                                formJSON.form.sections[sectionIndex].questions[
                                  questionIndex
                                ].userResponse = text;
                                setFormJSON(formJSON);
                              }}
                            />
                          </View>
                        ) : question.questionType === 'date' ? (
                          <View style={styles.queryCard}>
                            <Text style={styles.queryCardText}>
                              {question.question}
                            </Text>

                            <TextInput
                              style={styles.queryCardInput}
                              placeholder={
                                question.questionPlaceholder + ' (YYYY-MM-DD)'
                              }
                              placeholderTextColor="#747474"
                              onChangeText={text => {
                                formJSON.form.sections[sectionIndex].questions[
                                  questionIndex
                                ].userResponse = text;
                                setFormJSON(formJSON);
                              }}
                            />
                          </View>
                        ) : question.questionType === 'file' ? (
                          <View style={styles.queryCard}>
                            <Text style={styles.queryCardText}>
                              {question.question}
                            </Text>
                            <Button
                              style={styles.queryCardButton}
                              color="#A68192"
                              title="Attach"
                              onPress={() => {
                                DocumentPicker.pick({
                                  type: [DocumentPicker.types.allFiles],
                                  copyTo: 'documentDirectory',
                                }).then(file => {
                                  alert(JSON.stringify(file, null, 2));
                                  formJSON.form.sections[
                                    sectionIndex
                                  ].questions[questionIndex].userResponse =
                                    file[0].name;
                                  setFormJSON(formJSON);

                                  FileSystem.copyFile(
                                    file[0].uri,
                                    FileSystem.ExternalDirectoryPath +
                                      '/submissions/' +
                                      formJSON.submissionID +
                                      '/' +
                                      file[0].name,
                                  );
                                });
                              }}
                            />
                          </View>
                        ) : question.questionType === 'boolean' ? (
                          <View style={styles.queryCard}>
                            <Text style={styles.queryCardText}>
                              {question.question}
                            </Text>
                            <TextInput
                              style={styles.queryCardInput}
                              placeholder={
                                question.questionPlaceholder + ' (yes/no)'
                              }
                              placeholderTextColor="#747474"
                              onChangeText={text => {
                                formJSON.form.sections[sectionIndex].questions[
                                  questionIndex
                                ].userResponse = text;
                                setFormJSON(formJSON);
                              }}
                            />
                          </View>
                        ) : null}
                      </View>
                    );
                  })}
                </View>
              );
            })
          : null}
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Save Response"
          color="#A68192"
          onPress={() => {
            exportSubmission();
          }}
        />
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
  subtitle: {
    fontSize: 18,
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
  queryCardSwitch: {
    margin: 10,
  },
});
