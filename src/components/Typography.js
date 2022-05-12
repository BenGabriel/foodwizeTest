import {Text} from 'react-native';
import React from 'react';
import {font} from '../helper/Index';

const Typography = ({text, size, color, bold, style}) => {
  return (
    <Text
      style={{
        color: color ? color : '#000',
        fontSize: size ? size : 16,
        fontWeight: bold ? 'bold' : '400',
        ...style,
      }}>
      {text}
    </Text>
  );
};

export default Typography;
