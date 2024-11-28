import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import AboutScreen from '../screens/AboutScreen';
import ProductScreen from '../screens/ProductScreen';
import ProductDetailScreen from '../screens/ProductDetailsScreen';

export type RootStackParams = {
  Login: undefined;
  Home: undefined;
  About: undefined;
  Product: undefined;
  ProductDetail: {productId: number};
};

const Stack = createNativeStackNavigator();

const NavigationStack = () => {
  const {isLoggedIn} = useSelector((state: RootState) => state.user);

  return (
    <NavigationContainer>
      {!isLoggedIn ? (
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="Product">
          <Stack.Screen name="Product" component={ProductScreen} />
          <Stack.Screen
            name="ProductDetail"
            component={ProductDetailScreen as React.FC}
            options={{
              title: 'Product Details',
            }}
          />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="About" component={AboutScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default NavigationStack;
