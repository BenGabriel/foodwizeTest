import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import { Colors } from '../helper/index';
import Styles from '../helper/styles';

const Button = props => {
  return (
    <TouchableOpacity {...props} style={{...styles.button, ...props.style}}>
      <Text style={styles.text}>{props.children}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    width: '80%',
    height: 50,
    borderRadius: 100,
    marginTop: 10,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  text: {
    ...Styles.text('#fff', 16, true),
    textAlign: 'center',
  },
});
