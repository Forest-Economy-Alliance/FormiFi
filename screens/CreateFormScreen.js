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

  function setNQuestions(sectionIndex, nQuestions) {
    setFormJSON({
      ...formJSON,
      sections: [
        ...formJSON.sections.slice(0, sectionIndex),
        {
          ...formJSON.sections[sectionIndex],
          nQuestions: nQuestions,
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

  return (
    <View>
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
        {/* render nSections sections and get usr input */}
        {formJSON.sections.map((section, index) => (
          <View key={index}>
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
          </View>
        ))}

        <Button
          color="#A68192"
          title="Show Form"
          onPress={() => {
            alert(JSON.stringify(formJSON, null, 2));
          }}></Button>
      </ScrollView>
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
    </View>
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
