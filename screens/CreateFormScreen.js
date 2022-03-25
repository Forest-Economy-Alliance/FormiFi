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

import FileSystem from 'react-native-fs';

export function CreateFormScreen({navigation, route}) {
  const [formJSON, setFormJSON] = useState({
    formID: '',
    formName: '',
    formDescription: '',
    nSections: 0,
    sections: [],
  });

  function setFormName(formName) {
    var formID = getFormID(formName);
    setFormJSON({
      ...formJSON,
      formName: formName,
      formID: formID,
    });
  }

  function setFormDescription(formDescription) {
    setFormJSON({
      ...formJSON,
      formDescription: formDescription,
    });
  }

  const [sections, setSections] = useState([]);
  function setNSections(nSections) {
    setSections([]);
    for (var i = 0; i < nSections; i++) {
      sections.push({
        sectionName: '',
        nQuestions: 0,
        questions: [],
      });
    }

    setFormJSON({
      ...formJSON,
      nSections: nSections,
      sections: sections,
    });
  }

  function setSectionName(sectionIndex, sectionName) {
    setFormJSON({
      ...formJSON,
      sections: [
        ...formJSON.sections.slice(0, sectionIndex),
        {
          ...formJSON.sections[sectionIndex],
          sectionName: sectionName,
        },
        ...formJSON.sections.slice(sectionIndex + 1),
      ],
    });
  }

  const [questions, setQuestions] = useState([]);
  function setNQuestions(sectionIndex, nQuestions) {
    setQuestions([]);
    for (var i = 0; i < nQuestions; i++) {
      questions.push({
        question: '',
        questionType: '',
        questionRequired: false,
        questionPlaceholder: '',
        userResponse: '',
      });
    }

    setFormJSON({
      ...formJSON,
      sections: [
        ...formJSON.sections.slice(0, sectionIndex),
        {
          ...formJSON.sections[sectionIndex],
          nQuestions: nQuestions,
          questions: questions,
        },
        ...formJSON.sections.slice(sectionIndex + 1),
      ],
    });
  }

  function setQuestion(sectionIndex, questionIndex, question) {
    setFormJSON({
      ...formJSON,
      sections: [
        ...formJSON.sections.slice(0, sectionIndex),
        {
          ...formJSON.sections[sectionIndex],
          questions: [
            ...formJSON.sections[sectionIndex].questions.slice(
              0,
              questionIndex,
            ),
            {
              ...formJSON.sections[sectionIndex].questions[questionIndex],
              question: question,
            },
            ...formJSON.sections[sectionIndex].questions.slice(
              questionIndex + 1,
            ),
          ],
        },
        ...formJSON.sections.slice(sectionIndex + 1),
      ],
    });
  }

  function setQuestionType(sectionIndex, questionIndex, questionType) {
    setFormJSON({
      ...formJSON,
      sections: [
        ...formJSON.sections.slice(0, sectionIndex),
        {
          ...formJSON.sections[sectionIndex],
          questions: [
            ...formJSON.sections[sectionIndex].questions.slice(
              0,
              questionIndex,
            ),
            {
              ...formJSON.sections[sectionIndex].questions[questionIndex],
              questionType: questionType,
            },
            ...formJSON.sections[sectionIndex].questions.slice(
              questionIndex + 1,
            ),
          ],
        },
        ...formJSON.sections.slice(sectionIndex + 1),
      ],
    });
  }

  function setQuestionRequired(sectionIndex, questionIndex, questionRequired) {
    setFormJSON({
      ...formJSON,
      sections: [
        ...formJSON.sections.slice(0, sectionIndex),
        {
          ...formJSON.sections[sectionIndex],
          questions: [
            ...formJSON.sections[sectionIndex].questions.slice(
              0,
              questionIndex,
            ),
            {
              ...formJSON.sections[sectionIndex].questions[questionIndex],
              questionRequired: questionRequired,
            },
            ...formJSON.sections[sectionIndex].questions.slice(
              questionIndex + 1,
            ),
          ],
        },
        ...formJSON.sections.slice(sectionIndex + 1),
      ],
    });
  }

  function setQuestionPlaceholder(
    sectionIndex,
    questionIndex,
    questionPlaceholder,
  ) {
    setFormJSON({
      ...formJSON,
      sections: [
        ...formJSON.sections.slice(0, sectionIndex),
        {
          ...formJSON.sections[sectionIndex],
          questions: [
            ...formJSON.sections[sectionIndex].questions.slice(
              0,
              questionIndex,
            ),
            {
              ...formJSON.sections[sectionIndex].questions[questionIndex],
              questionPlaceholder: questionPlaceholder,
            },
            ...formJSON.sections[sectionIndex].questions.slice(
              questionIndex + 1,
            ),
          ],
        },
        ...formJSON.sections.slice(sectionIndex + 1),
      ],
    });
  }

  function getFormID(formName) {
    var formID = formName.replace(/\s/g, '_');
    formID = formID.replace(/\W/g, '');
    formID = formID.toLowerCase();

    formID = formID + '_' + Math.floor(Math.random() * 9);
    formID = formID + '_' + Math.floor(Math.random() * 9);
    formID = formID + '_' + Math.floor(Math.random() * 9);
    formID = formID + '_' + Math.floor(Math.random() * 9);

    return formID;
  }

  function exportFormJSON() {
    const jsonString = JSON.stringify(formJSON, null, 2);
    const fileName = formJSON.formID + '.json';

    var path = FileSystem.DownloadDirectoryPath + '/FormiFi/' + fileName;

    FileSystem.writeFile(path, jsonString, 'utf8').then(success => {
      alert('File written to ' + path);
    });
  }

  return (
    <ScrollView>
      <View style={styles.queryCard}>
        <Text style={styles.queryCardText}>Form Name</Text>
        <TextInput
          style={styles.queryCardInput}
          placeholder="Enter the Form Name"
          placeholderTextColor="#747474"
          onChangeText={text => setFormName(text)}
        />
        <Text style={styles.queryCardText}>Form Description</Text>
        <TextInput
          style={styles.queryCardInput}
          placeholder="Enter the Form Description"
          placeholderTextColor="#747474"
          onChangeText={text => setFormDescription(text)}
        />
        <Text style={styles.queryCardText}>Number of Sections</Text>
        <TextInput
          style={styles.queryCardInput}
          placeholder="Enter the Number of Sections"
          placeholderTextColor="#747474"
          keyboardType="numeric"
          onChangeText={text => setNSections(text)}
        />
      </View>
      {formJSON.sections.map((section, index) => (
        <View key={index}>
          <Text style={styles.title}>Section {index + 1}</Text>
          <View style={styles.queryCard}>
            <Text style={styles.queryCardText}>Section Name</Text>
            <TextInput
              style={styles.queryCardInput}
              placeholder="Enter the Section Name"
              placeholderTextColor="#747474"
              onChangeText={text => setSectionName(index, text)}
            />
            <Text style={styles.queryCardText}>Number of Questions</Text>
            <TextInput
              style={styles.queryCardInput}
              placeholder="Enter the Number of Questions"
              placeholderTextColor="#747474"
              keyboardType="numeric"
              onChangeText={text => setNQuestions(index, text)}
            />
          </View>
          {section.questions.map((question, questionIndex) => (
            <View key={questionIndex}>
              <Text style={styles.title}>Question {questionIndex + 1}</Text>
              <View style={styles.queryCard}>
                <Text style={styles.queryCardText}>Question</Text>
                <TextInput
                  style={styles.queryCardInput}
                  placeholder="Enter the Question"
                  placeholderTextColor="#747474"
                  onChangeText={text => setQuestion(index, questionIndex, text)}
                />
                <Text style={styles.queryCardText}>Question Type</Text>
                <TextInput
                  style={styles.queryCardInput}
                  placeholder="Enter the Question Type"
                  placeholderTextColor="#747474"
                  onChangeText={text =>
                    setQuestionType(index, questionIndex, text)
                  }
                />

                <Text style={styles.queryCardText}>Question Required</Text>
                <TextInput
                  style={styles.queryCardInput}
                  placeholder="Enter the Question Required"
                  placeholderTextColor="#747474"
                  onChangeText={text =>
                    setQuestionRequired(index, questionIndex, text)
                  }
                />

                <Text style={styles.queryCardText}>Question Placeholder</Text>
                <TextInput
                  style={styles.queryCardInput}
                  placeholder="Enter the Question Placeholder"
                  placeholderTextColor="#747474"
                  onChangeText={text =>
                    setQuestionPlaceholder(index, questionIndex, text)
                  }
                />
              </View>
            </View>
          ))}
        </View>
      ))}

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <View style={{padding: 5, width: '35%'}}>
          <Button
            color="#8192A6"
            title="Show Form"
            onPress={() => {
              alert(JSON.stringify(formJSON, null, 2));
            }}
          />
        </View>
        <View style={{padding: 5, width: '35%'}}>
          <Button
            color="#A68192"
            title="Export Form"
            onPress={() => {
              exportFormJSON();
            }}
          />
        </View>
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
  progressBar: {
    paddingHorizontal: 20,
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
