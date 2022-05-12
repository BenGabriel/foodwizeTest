import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {setEmail, setName} from '../../redux/actions/loginActions';
import {useNavigation} from '@react-navigation/native';
import Typography from '../../components/Typography';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Styles from '../../helper/styles';
import {Colors} from '../../helper/index';
import Ionicons from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('window');

const Register = () => {
  const [user, setUser] = useState({
    email: '',
    name: '',
  });
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleRegister = () => {
    const emailRegex = RegExp(
      /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
    );

    if (user.name === '' || user.email === '')
      return alert('User does not exist, Please sign up');

    if (!emailRegex.test(user.email)) {
      return alert('Enter a valid email');
    }

    dispatch(setName(user.name));
    dispatch(setEmail(user.email));
    navigation.navigate('Login');
  };

  const navigateToLogin = () => {
    navigation.goBack();
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
        <Ionicons
          name="chevron-back-sharp"
          style={styles.icon}
          size={25}
          onPress={navigateToLogin}
        />
        <Typography text="Register" size={30} />
        <Typography
          text="Kindly complete the information"
          size={20}
          style={{marginVertical: 10}}
        />

        <View style={{width: '100%', marginTop: 30, alignItems: 'center'}}>
          <Input
            placeholder="Name"
            onChangeText={value => setUser({...user, name: value})}
          />
          <Input
            placeholder="Email"
            onChangeText={value => setUser({...user, email: value})}
          />
        </View>
        <Button style={{marginTop: 50}} onPress={handleRegister}>
          Register
        </Button>
        <Text
          style={{
            ...Styles.text(Colors.grey, 17, false),
            marginTop: 10,
          }}>
          Already have an account?{' '}
          <Text style={{color: Colors.primary}} onPress={navigateToLogin}>
            Sign in
          </Text>
        </Text>
      </ImageBackground>
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  icon: {
    padding: 15,
    borderRadius: 100,
    backgroundColor: '#ECF0F4',
    alignSelf: 'flex-start',
    margin: 30,
    position: 'absolute',
    top: 30,
  },
});
