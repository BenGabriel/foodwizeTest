import {StyleSheet} from 'react-native';

const Styles = StyleSheet.create({
  text: (color, size, value) => ({
    color,
    fontSize: size,
    fontFamily: value ? 'bold' : '400',
  }),
});

export default Styles;
