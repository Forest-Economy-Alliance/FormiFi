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
  const [formJSON, setFormJSON] = useState('');

  var formName, formDescription, nSections, sections;

  function QuestionCard() {
    var questionJSON = '';

    const [question, setQuestion] = useState('');
    const [questionType, setQuestionType] = useState('');
    const [questionRequired, setQuestionRequired] = useState(false);
    const [questionPlaceholder, setQuestionPlaceholder] = useState('');
    const [userResponse, setUserResponse] = useState('');

    const toggleSwitch = () => setQuestionRequired(!questionRequired);

    return (
      <View style={styles.queryCard}>
        <Text style={styles.queryCardText}>Question</Text>
        <TextInput
          style={styles.queryCardInput}
          placeholder="Enter the Question"
          placeholderTextColor="#747474"
          onChangeText={text => setQuestion(text)}
        />
        <Text style={styles.queryCardText}>Question Type</Text>
        <TextInput
          style={styles.queryCardInput}
          placeholder="Question Type"
          placeholderTextColor="#747474"
          onChangeText={text => setQuestionType(text)}
        />
        <Text style={styles.queryCardText}>Question Required?</Text>
        <Switch
          trackColor={{false: '#9F9F9F', true: '#91B8E9'}}
          thumbColor={questionRequired ? '#1976D2' : '#FFFFFF'}
          onValueChange={toggleSwitch}
          value={questionRequired}
        />
        <Text style={styles.queryCardText}>Question Placeholder</Text>
        <TextInput
          style={styles.queryCardInput}
          placeholder="Question Placeholder"
          placeholderTextColor="#747474"
          onChangeText={text => setQuestionPlaceholder(text)}
        />
      </View>
    );
  }

  function SectionCard() {
    var sectionJSON = '';

    const [sectionName, setSectionName] = useState('');
    const [sectionDescription, setSectionDescription] = useState('');
    const [nQuestions, setNQuestions] = useState('');
    const [questions, setQuestions] = useState([]);

    return (
      <View style={styles.queryCard}>
        <Text style={styles.queryCardText}>Section Name</Text>
        <TextInput
          style={styles.queryCardInput}
          placeholder="Enter the Section Name"
          placeholderTextColor="#747474"
          onChangeText={text => setSectionName(text)}
        />
        <Text style={styles.queryCardText}>Section Description</Text>
        <TextInput
          style={styles.queryCardInput}
          placeholder="Enter the Section Description"
          placeholderTextColor="#747474"
          onChangeText={text => setSectionDescription(text)}
        />
        <Text style={styles.queryCardText}>Number of Questions</Text>
        <TextInput
          style={styles.queryCardInput}
          placeholder="Enter the Number of Questions"
          placeholderTextColor="#747474"
          keyboardType="numeric"
          onChangeText={text => setNQuestions(text)}
        />
        <Text style={styles.queryCardText}>Questions</Text>
      </View>
    );
  }

  function IntroCard() {
    return (
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
        <Text style={styles.queryCardText}>Sections</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View>{IntroCard()}</View>
      <View>{SectionCard()}</View>
      <View>{QuestionCard()}</View>
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
