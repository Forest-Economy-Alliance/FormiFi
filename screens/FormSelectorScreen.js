import React, {useState} from 'react';
import {View, StyleSheet, Button, BackHandler} from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';
import DocumentPicker from 'react-native-document-picker';
import FileSystem from 'react-native-fs';
import {sha256} from 'js-sha256';

export function FormSelectorScreen({navigation, route}) {
  const {data} = route.params;

  const responseJSON = {
    name: data.Name,
    age: data.Age,
    sex: data.Sex,
    form_name: '',
    form: {},
    response: {},
    submissionID: '',
  };

  const [form, setForm] = useState(null);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'ISB Forms', value: 'ISB Forms', disabled: true},
    {label: 'PMS Drill Down', value: 'PMS Drill Down', parent: 'ISB Forms'},
    {
      label: 'CFP Project Monitoring',
      value: 'CFP Project Monitoring',
      parent: 'ISB Forms',
    },
    {
      label: 'FRC Constituiton',
      value: 'FRC Constituiton',
      parent: 'ISB Forms',
    },
    {
      label: 'Fire Ground Truth Collection',
      value: 'Fire Ground Truth Collection',
      parent: 'ISB Forms',
    },

    {label: 'Custom Forms', value: 'Custom Forms', disabled: true},
  ]);

  function Generate_SubmissionID(data, Form) {
    var {Name, Age, Sex} = data;
    Name = Name.replace(/ /g, '_');
    Form = Form.replace(/ /g, '_');
    var user_info = Name + Age + Sex;
    user_info = user_info.replace(/ /g, '_');
    var shuffled_user_info = user_info
      .split('')
      .sort(function () {
        return 0.5 - Math.random();
      })
      .join('');
    const ReponseID = Form + '_' + Name + '_' + sha256(shuffled_user_info);
    return ReponseID;
  }

  // function GetInitials(string) {
  //   var initials = '';
  //   var words = string.toLowerCase().split(/[^a-zA-Z\d:]/);
  //   for (var i = 0; i < words.length; i++) {
  //     initials += words[i].charAt(0);
  //   }
  //   return initials;
  // }

  function importForm() {
    DocumentPicker.pick({
      allowMultiSelection: false,
      type: [DocumentPicker.types.allFiles],
      copyTo: 'documentDirectory',
    }).then(form => {
      let file_name = form[0].name;
      let file_path = form[0].uri;

      let dest_path = FileSystem.ExternalDirectoryPath + '/forms/' + file_name;

      FileSystem.copyFile(file_path, dest_path).then(() => {
        let new_items = items.filter(
          item => item.label !== file_name.split('.')[0],
        );
        new_items.push({
          label: file_name.split('.')[0],
          value: file_name.split('.')[0],
          parent: 'Custom Forms',
        });
        setItems(new_items);
      });
    });
  }

  function handleSubmit(form) {
    responseJSON.form_name = form;
    responseJSON.submissionID = Generate_SubmissionID(data, form);
    console.log(
      'Going to the Form with',
      JSON.stringify(responseJSON, null, 4),
    );
    navigation.navigate('Form', {responseJSON});

    FileSystem.readFile(
      FileSystem.ExternalDirectoryPath + '/forms/' + form + '.json',
      'utf8',
    )
      .then(content => {
        responseJSON.form = JSON.parse(content, null, 2);
        responseJSON.form_name = form;
        responseJSON.submissionID = Generate_submissionID(data, form);
        // console.log('Going to the Form with', JSON.stringify(responseJSON, null, 4));
        navigation.navigate('Form', {responseJSON});
      })
      .catch(err => {
        responseJSON.form_name = form;
        responseJSON.submissionID = Generate_submissionID(data, form);
        console.log(
          'Going to the Form with',
          JSON.stringify(responseJSON, null, 4),
        );
        navigation.navigate('Form', {responseJSON});
      });
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#EEEEDA',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          marginHorizontal: 40,
          paddingVertical: 10,
        }}>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          stickyHeader={true}
          placeholder="Select a Form"
          placeholderStyle={{
            color: '#000',
            fontWeight: 'bold',
            fontSize: 15,
          }}
          labelStyle={{
            color: '#000',
            fontWeight: 'bold',
            fontSize: 15,
          }}
          listItemLabelStyle={{
            color: '#000',
            fontWeight: 'bold',
            fontSize: 15,
          }}
          style={{
            backgroundColor: '#EEEEDA',
          }}
          searchable={false}
          searchPlaceholder="Search for a Form"
          onChangeValue={value => {
            setForm(value);
          }}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
        }}>
        <View style={{padding: 5, width: '25%'}}>
          <Button
            color="#8192A6"
            title="Create a Form"
            onPress={() => {
              navigation.navigate('CreateForm');
            }}></Button>
        </View>
        <View style={{padding: 5, width: '25%'}}>
          <Button
            color="#A68192"
            title="Import a Form"
            onPress={importForm}></Button>
        </View>
        <View style={{padding: 5, width: '25%'}}>
          <Button
            color="#81A695"
            title="Start Filling"
            onPress={() => {
              if (form) {
                handleSubmit(form);
              } else {
                alert('Please select a form');
              }
            }}></Button>
        </View>
      </View>
    </View>
  );
}
