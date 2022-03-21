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

/*
{
  "formID": 123456789,
  "formName": "Important ISB Form",
  "formDescription": "This is an important form",
  "nSections": 2,
  "sections": [
    {
      "sectionName": "A super cool section",
      "sectionDescription": "This is a super cool section",
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
      "sectionDescription": "This is another super cool section",
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

export function CreateFormScreen({navigation, route}) {
  const [formJSON, setFormJSON] = useState({
    formID: '',
    formName: '',
    formDescription: '',
    nSections: 0,
    sections: [],
  });

  function setFormID(formID) {
    setFormJSON({
      ...formJSON,
      formID: formID,
    });
  }

  function setFormName(formName) {
    setFormJSON({
      ...formJSON,
      formName: formName,
    });
  }

  function setFormDescription(formDescription) {
    setFormJSON({
      ...formJSON,
      formDescription: formDescription,
    });
  }

  function setNSections(nSections) {
    setFormJSON({
      ...formJSON,
      nSections: nSections,
    });
  }

  function setSections(sections) {
    setFormJSON({
      ...formJSON,
      sections: sections,
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
      {/* <View>{SectionCard(nSections)}</View> */}
      <View
        style={{
          padding: 5,
          width: '100%',
        }}>
        <Button
          color="#A68192"
          title="Create Form"
          // onPress={createFormJSON(
          //   formName,
          //   formDescription,
          //   nSections,
          //   sections,
          // )}
          onPress={() => {
            alert('JSON SAVED!');
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
