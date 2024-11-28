import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {RootStackParams} from '../navigation/NavigationStack';
import {StaticScreenProps} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../store/store';
import {addToCart} from '../store/slices/cartSlice';

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

// type Props = NativeStackScreenProps<RootStackParams, 'ProductDetail'>;
type Props = StaticScreenProps<{
  productId: number;
}>;

const ProductDetailScreen = ({route}: Props) => {
  const {productId} = route.params;
  const dispatch = useDispatch<AppDispatch>();
  const {products} = useSelector((state: RootState) => state.cart);

  const product = DATA.find(item => item.id === productId);

  const handleAddToCart = ({product}: {product: Product}) => {
    dispatch(addToCart(product));
  };

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Product not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{uri: product.path}} style={styles.productImage} />
      <Text style={styles.productName}>{product.name}</Text>
      <TouchableOpacity onPress={() => handleAddToCart({product})}>
        <Text
          style={{
            backgroundColor: '#0d6efd',
            color: '#fff',
            padding: 8,
            borderRadius: 6,
            fontSize: 18,
          }}>
          Add To Cart
        </Text>
      </TouchableOpacity>

      <Text>{JSON.stringify(products)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  productImage: {
    width: 200,
    height: 200,
  },
  productName: {
    fontSize: 24,
  },
});

export default ProductDetailScreen;
