import {
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  Modal,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FlatList} from 'react-native-gesture-handler';
import Typography from '../../components/Typography';
import Button from '../../components/Button';
import {setFavourite} from '../../redux/actions/actions';
import {checkIfFavourite} from '../../helper/index';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

const {height} = Dimensions.get('window');
const User = () => {
  const {name, email} = useSelector(state => state.loginReducer);
  const {favouriteAnimals} = useSelector(state => state.animalReducer);
  const dispatch = useDispatch();

  const [image, setImage] = useState('');
  const [visible, setVisible] = useState(false);

  const getRandom = async () => {
    setImage('');
    try {
      setVisible(true);
      const res = await axios.get('https://dog.ceo/api/breeds/image/random');
      console.log(res.data);
      setImage(res.data.message);
    } catch (error) {
      setVisible(false);
      console.log(error);
    }
  };
  return (
    <View style={{flex: 1, paddingHorizontal: 10, backgroundColor: '#fff'}}>
      <Typography
        text={name}
        size={30}
        bold
        style={{marginTop: 20, marginLeft: 5}}
      />
      <Typography
        text={email}
        size={16}
        bold
        style={{marginVertical: 10, marginLeft: 5}}
      />
      <Button style={styles.button} onPress={getRandom}>
        Get Random
      </Button>
      {favouriteAnimals.length === 0 ? (
        <Typography
          text="You do not have any favourite"
          size={16}
          style={{marginVertical: height / 3, textAlign: 'center'}}
        />
      ) : (
        <>
          <Typography
            text="My Favourite Breeds"
            size={16}
            style={{marginVertical: 20, textAlign: 'center'}}
          />
          <FlatList
            data={favouriteAnimals}
            renderItem={({item}) => (
              <View style={styles.fave}>
                <Typography text={item} size={20} />
                <TouchableOpacity onPress={() => dispatch(setFavourite(item))}>
                  <Icon
                    name={
                      checkIfFavourite(item, favouriteAnimals)
                        ? 'heart'
                        : 'heart-outline'
                    }
                    size={18}
                    color={
                      checkIfFavourite(item, favouriteAnimals) ? 'red' : '#333'
                    }
                  />
                </TouchableOpacity>
              </View>
            )}
          />
        </>
      )}
      <Modal
        visible={visible}
        onRequestClose={() => setVisible(false)}
        animationType="slide">
        <TouchableOpacity
          onPress={() => setVisible(false)}
          style={{alignSelf: 'flex-end', paddingTop: 20, paddingRight: 30}}>
          <Icon name="close" size={28} color="#333" />
        </TouchableOpacity>
        {image === '' ? (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator size={30} color="blue" />
          </View>
        ) : (
          <Image
            source={{uri: image}}
            style={{
              width: '100%',
              height: '90%',
            }}
            resizeMode="contain"
          />
        )}
      </Modal>
    </View>
  );
};

export default User;

const styles = StyleSheet.create({
  fave: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginVertical: 5,
    alignSelf: 'center',
    elevation: 2,
    borderTopWidth: 0.2,
    borderColor: '#ccc',
  },
  button: {
    position: 'absolute',
    width: '30%',
    borderRadius: 10,
    right: 20,
    top: 10,
    height: 40,
  },
});
