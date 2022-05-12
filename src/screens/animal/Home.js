import {
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getAnimal, setFavourite} from '../../redux/actions/actions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors, checkIfFavourite} from '../../helper/index';
import Typography from '../../components/Typography';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import Input from '../../components/Input';

const Home = () => {
  const {animals, favouriteAnimals} = useSelector(state => state.animalReducer);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [subBreed, viewSubBreed] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(getAnimal());
  }, []);

  const displaySubBreed = useCallback(
    value => {
      subBreed === value ? viewSubBreed('') : viewSubBreed(value);
    },
    [subBreed],
  );

  const allAnimals = animals.filter(t => t.name.startsWith(search.toLowerCase()));

  return (
    <View style={{flex: 1, paddingHorizontal: 10, backgroundColor: '#fff'}}>
      <Typography
        text="Dog Breeds"
        size={30}
        bold
        style={{marginVertical: 20, marginLeft: 10}}
      />
      <Input
        placeholder="Search"
        onChangeText={value => setSearch(value)}
        style={{
          width: '90%',
          alignSelf: 'center',
          borderWidth: 1,
          marginBottom: 10,
        }}
      />
      {animals.length === 0 ? (
        <View style={{flex: 1}}>
          <ActivityIndicator size={40} color={Colors.primary} />
        </View>
      ) : (
        <FlatList
          data={allAnimals}
          renderItem={({item}) => (
            <>
              <Pressable
                style={styles.animalItem}
                onPress={() =>
                  navigation.navigate('Animal', {
                    item,
                  })
                }>
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
                <Typography
                  text={item.name}
                  size={20}
                  style={{
                    marginLeft: 20,
                  }}
                />
                {item.sub_breed.length > 0 && (
                  <Pressable
                    onPress={() => displaySubBreed(item.name)}
                    style={{
                      position: 'absolute',
                      right: 30,
                      padding: 10,
                    }}>
                    <Entypo name="chevron-down" size={18} />
                  </Pressable>
                )}
              </Pressable>
              <View
                style={{
                  width: '90%',
                  alignSelf: 'flex-end',
                  display: subBreed === item.name ? 'flex' : 'none',
                }}>
                {item.sub_breed.map(breed => (
                  <Pressable style={styles.sub_breed} key={breed}>
                    <TouchableOpacity
                      onPress={() => dispatch(setFavourite(breed))}>
                      <Icon
                        name={
                          checkIfFavourite(breed, favouriteAnimals)
                            ? 'heart'
                            : 'heart-outline'
                        }
                        size={18}
                        color={
                          checkIfFavourite(breed, favouriteAnimals)
                            ? 'red'
                            : '#333'
                        }
                      />
                    </TouchableOpacity>
                    <Typography
                      text={breed}
                      size={20}
                      style={{
                        marginLeft: 20,
                      }}
                    />
                  </Pressable>
                ))}
              </View>
            </>
          )}
        />
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  animalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginVertical: 5,
    width: '100%',
    alignSelf: 'center',
    elevation: 2,
    borderTopWidth: 0.2,
    borderColor: '#ccc',
  },
  sub_breed: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    width: '100%',
    alignSelf: 'center',
    marginBottom: 1,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
});
