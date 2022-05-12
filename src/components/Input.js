import {StyleSheet, TextInput} from 'react-native';
import React from 'react';
import Styles from '../helper/styles';

const Input = ({placeholder, onChangeText, style}) => {
  return (
    <TextInput
      placeholder={placeholder}
      style={[styles.input, style]}
      onChangeText={onChangeText}
      autoComplete="off"
    />
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    ...Styles.text('#333', 18, false),
    borderWidth: 0.5,
    borderColor: '#aaa',
    marginVertical: 6,
    width: '80%',
    borderRadius: 50,
    paddingLeft: 20,
    height: 46,
  },
});
