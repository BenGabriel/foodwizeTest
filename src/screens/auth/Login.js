import {
  ImageBackground,
  ScrollView,
  Text,
  View,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Typography from '../../components/Typography';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Styles from '../../helper/styles';
import {Colors} from '../../helper/index';

const {width, height} = Dimensions.get('window');

const Login = () => {
  const {email} = useSelector(state => state.loginReducer);
  const [userEmail, setEmail] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    if (email === '') {
      return alert('Pleas enter an email');
    }
    if (email !== userEmail)
      return alert('User does not exist, Please sign up');
    navigation.replace('App');
  };

  const navigateToRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <ScrollView style={{flex: 1, width}} showsVerticalScrollIndicator={false}>
      <ImageBackground
        source={require('../../assets/authbackground.png')}
        style={{
          width,
          height,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Typography text="Welcome" size={30} />
        <Typography text="Sign In" size={20} style={{marginVertical: 10}} />

        <View style={{width: '100%', marginTop: 30, alignItems: 'center'}}>
          <Input placeholder="Email" onChangeText={value => setEmail(value)} />
        </View>
        <Button style={{marginTop: 50}} onPress={handleLogin}>
          Login
        </Button>
        <Text
          style={{
            ...Styles.text(Colors.grey, 17, false),
            marginTop: 10,
          }}>
          Don’t have an account?{' '}
          <Text style={{color: Colors.primary}} onPress={navigateToRegister}>
            Sign up
          </Text>
        </Text>
      </ImageBackground>
    </ScrollView>
  );
};

export default Login;
