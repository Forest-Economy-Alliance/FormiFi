import React from 'react';
import {View, StyleSheet, TextInput, Button} from 'react-native';

import {useForm, Controller} from 'react-hook-form';

export function UserLoginScreen({navigation}) {
  const {handleSubmit, control, reset} = useForm({
    defaultValues: {
      Name: '',
      Age: '',
      Sex: '',
    },
  });

  async function onSubmit(data) {
    navigation.navigate('FormSelector', {data});
  }

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <View style={styles.DetailsInput}>
            <TextInput
              onBlur={onBlur}
              color="#292b2c"
              placeholder="Name"
              placeholderTextColor="#262626"
              onChangeText={value => onChange(value)}
              value={value}
            />
          </View>
        )}
        name="Name"
        rules={{required: true}}
      />
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <View style={styles.DetailsInput}>
            <TextInput
              onBlur={onBlur}
              color="#292b2c"
              placeholder="Age"
              keyboardType="numeric"
              placeholderTextColor="#262626"
              onChangeText={value => onChange(value)}
              value={value}
            />
          </View>
        )}
        name="Age"
        rules={{required: true}}
      />
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <View style={styles.DetailsInput}>
            <TextInput
              onBlur={onBlur}
              color="#292b2c"
              placeholder="Sex"
              placeholderTextColor="#262626"
              onChangeText={value => onChange(value)}
              value={value}
            />
          </View>
        )}
        name="Sex"
        rules={{required: true}}
      />

      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{padding: 5, width: '25%'}}>
          <Button
            color="#A68192"
            title="Reset Details"
            onPress={() => {
              reset({
                Name: '',
                Age: '',
                Sex: '',
              });
            }}
          />
        </View>
        <View style={{padding: 5, width: '25%'}}>
          <Button
            color="#81A695"
            title="Select a Form"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
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
  button: {
    backgroundColor: '#292b2c',
    borderRadius: 5,
    padding: 10,
    margin: 10,
  },
  DetailsInput: {
    width: '70%',
    borderWidth: 2.5,
    borderRadius: 10,
    margin: 5,
    padding: 5,
  },
});
