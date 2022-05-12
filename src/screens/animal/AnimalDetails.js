import {
  StyleSheet,
  View,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Typography from '../../components/Typography';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {setFavourite} from '../../redux/actions/actions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors, checkIfFavourite, getSubImage} from '../../helper/index';
import {useRoute} from '@react-navigation/native';

const {width} = Dimensions.get('window');
const AnimalDetails = () => {
  const {favouriteAnimals} = useSelector(state => state.animalReducer);
  
  const dispatch = useDispatch();
  const {params:{item}} = useRoute();

  const [mainImage, setMainImage] = useState('');
  const [images, setImages] = useState([]);

  const getImage = async () => {
    try {
      const res = await axios.get(
        `https://dog.ceo/api/breed/${item.name}/images`,
      );

      setMainImage(res.data.message[0]);
      const subImages = getSubImage(item.sub_breed, res.data.message);
      setImages(subImages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getImage();
  }, []);

  return (
    <View style={{flex: 1, paddingHorizontal: 10}}>
      <Typography
        text={item.name}
        size={30}
        bold
        style={{marginVertical: 20, marginLeft: 10}}
      />
      <View
        style={{
          width: '100%',
          height: '50%',
          padding: 30,
        }}>
        {mainImage === '' ? (
          <View style={{flex: 1, justifyContent:'center'}}>
            <ActivityIndicator color={Colors.primary} size={40} />
          </View>
        ) : (
          <>
            <Image
              source={{uri: mainImage}}
              style={{
                width: '100%',
                height: '100%',
              }}
              resizeMode="contain"
            />
            <TouchableOpacity
              onPress={() => dispatch(setFavourite(item.name))}
              style={styles.favourite}>
              <Icon
                name={
                  checkIfFavourite(item.name, favouriteAnimals)
                    ? 'heart'
                    : 'heart-outline'
                }
                size={25}
                color={
                  checkIfFavourite(item.name, favouriteAnimals) ? 'red' : '#333'
                }
              />
              <Typography
                text="Favourite"
                size={20}
                style={{
                  marginLeft: 10,
                  marginTop: -5,
                }}
              />
            </TouchableOpacity>
          </>
        )}
      </View>
      <View style={{marginTop: 50}}>
        {images.length > 0 && (
          <FlatList
            data={images}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <View style={styles.subcard}>
                <View style={{width: '100%', height: 100}}>
                  <Image
                    source={{uri: item.image}}
                    style={{width: '100%', height: '90%', borderRadius: 5}}
                  />
                </View>
                <View style={styles.subText}>
                  <Typography text={item.name} size={14} bold />
                  <TouchableOpacity
                    onPress={() => dispatch(setFavourite(item.name))}>
                    <Icon
                      name={
                        checkIfFavourite(item.name, favouriteAnimals)
                          ? 'heart'
                          : 'heart-outline'
                      }
                      size={18}
                      color={
                        checkIfFavourite(item.name, favouriteAnimals)
                          ? 'red'
                          : '#333'
                      }
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
};

export default AnimalDetails;

const styles = StyleSheet.create({
  favourite: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  subcard: {
    backgroundColor: '#fff',
    elevation: 1,
    width: width * 0.3,
    marginLeft: 10,
    borderRadius: 20,
    padding: 10,
    marginBottom: 5,
  },
  subText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
});
