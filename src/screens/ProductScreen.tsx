import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {RootStackParams} from '../navigation/NavigationStack';

const DATA = [
  {
    id: 1,
    name: 'Product 1',
    path: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    name: 'Product 2',
    path: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    name: 'Product 3',
    path: 'https://via.placeholder.com/150',
  },
  {
    id: 4,
    name: 'Product 4',
    path: 'https://via.placeholder.com/150',
  },
  {
    id: 5,
    name: 'Product 5',
    path: 'https://via.placeholder.com/150',
  },
  {
    id: 6,
    name: 'Product 6',
    path: 'https://via.placeholder.com/150',
  },
  {
    id: 7,
    name: 'Product 7',
    path: 'https://via.placeholder.com/150',
  },
  {
    id: 8,
    name: 'Product 8',
    path: 'https://via.placeholder.com/150',
  },
];

type Card = Product;

interface IProps {
  navigation: NativeStackNavigationProp<RootStackParams>;
}

// type Props = NativeStackScreenProps<RootStackParams, 'Product'>;

const ProductScreen = ({navigation}: IProps) => {
  const Card = ({...item}: Card) => (
    <View style={styles.productCard}>
      <Image source={{uri: item.path}} style={styles.productImage} />
      <View style={{flexDirection: 'column', gap: 9}}>
        <Text style={styles.productName}>{item.name}</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ProductDetail', {
              productId: item.id,
            })
          }>
          <Text
            style={{
              backgroundColor: '#0d6efd',
              color: '#fff',
              padding: 8,
              borderRadius: 6,
            }}>
            View Details
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.header}>Product Screen</Text>
      <FlatList
        data={DATA}
        renderItem={({item}) => <Card {...item} />}
        keyExtractor={item => String(item.id)}
        numColumns={2}
        columnWrapperStyle={{
          gap: 10,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  productCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ddd',
  },
  productImage: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  productName: {
    fontSize: 18,
  },
});

export default ProductScreen;
