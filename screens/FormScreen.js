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
  // alert(JSON.stringify(formJSON, null, 2));

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

                            <DatePicker
                              style={styles.datePicker}
                              date={
                                formJSON.form.sections[sectionIndex].questions[
                                  questionIndex
                                ].userResponse
                              }
                              mode="date"
                              placeholder="select date"
                              format="YYYY-MM-DD"
                              minDate="1900-01-01"
                              maxDate="2099-12-31"
                              confirmBtnText="Confirm"
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
                                  setAttachment(file);
                                  let file_name = form[0].name;
                                  let file_path = form[0].uri;

                                  let dest_path =
                                    FileSystem.ExternalDirectoryPath +
                                    '/files' +
                                    '/' +
                                    file_name;

                                  FileSystem.copyFile(
                                    file_path,
                                    dest_path,
                                  ).then(() => {});
                                });
                              }}
                            />
                          </View>
                        ) : question.questionType === 'switch' ? (
                          <Switch
                            style={styles.switch}
                            value={question.userResponse}
                            onValueChange={value => {
                              formJSON.form.sections[sectionIndex].questions[
                                questionIndex
                              ].userResponse = value;
                              setFormJSON(formJSON);
                            }}
                          />
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
          title="Submit"
          color="#A68192"
          onPress={() => {
            alert(JSON.stringify(formJSON, null, 2));
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
});
