import {Button, FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../store/store';
import {handleLogout} from '../store/slices/userSlice';

type IProps = {
  navigation: {
    navigate: (screen: string) => void;
  };
};

type Card = {
  id: number;
  name: string;
  path: string;
};

const Card = ({...item}: Card) => {
  return (
    <View style={styles.cardContainer}>
      <Text
        style={{
          color: '#FFF',
        }}>
        {item.name}
      </Text>
      {/* <Image source={item.path}/> */}
    </View>
  );
};

const HomeScreen = ({navigation}: IProps) => {
  const {username} = useSelector((state: RootState) => state?.user);
  const dispatch = useDispatch<AppDispatch>();

  const DATA = [
    {
      id: 1,
      name: 'test1',
      path: '/',
    },
    {
      id: 2,
      name: 'test2',
      path: '/',
    },
    {
      id: 3,
      name: 'test3',
      path: '/',
    },
  ];

  const handleUserLogout = () => {
    dispatch(handleLogout());
  };
  return (
    <View style={styles.container}>
      {username && <Text>Welcome Back {username}</Text>}
      {/* <View style={styles.containerCard}>
        <FlatList
          data={DATA}
          keyExtractor={item => String(item.id)}
          renderItem={({item}) => <Card {...item} />}
          horizontal={true}
        />
      </View> */}
      <Button onPress={handleUserLogout} title="logout"></Button>
      <Button
        onPress={() => navigation.navigate('About')}
        title="Go to About"></Button>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerCard: {
    flex: 1,
    // flexDirection: ''
  },
  cardContainer: {
    backgroundColor: '#0000FF',
    paddingVertical: 20,
    paddingHorizontal: 40,
    marginHorizontal: 5,
    color: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    borderRadius: 16,
  },
});
