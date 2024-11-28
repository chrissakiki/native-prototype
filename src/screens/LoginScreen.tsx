import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {handleLogin, loadUserFromRealm} from '../store/slices/userSlice';
import {AppDispatch, RootState} from '../store/store';
import {useDispatch, useSelector} from 'react-redux';

type IProps = {
  navigation: {
    navigate: (screen: string) => void;
  };
};

const LoginScreen = ({navigation}: IProps) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const dispatch = useDispatch<AppDispatch>();
  const {username, status, error} = useSelector(
    (state: RootState) => state.user,
  );

  const handleSubmit = () => {
    dispatch(handleLogin(credentials));
  };

  useEffect(() => {
    dispatch(loadUserFromRealm());
  }, []);

  return (
    <View style={styles?.container}>
      {/* <Text>LoginScreen</Text> */}
      <TextInput
        value={credentials?.username}
        placeholder="username"
        onChangeText={value =>
          setCredentials(prev => ({...prev, username: value}))
        }
        style={styles?.input}
      />
      <TextInput
        value={credentials?.password}
        placeholder="password"
        onChangeText={value =>
          setCredentials(prev => ({...prev, password: value}))
        }
        secureTextEntry={true}
        style={styles?.input}
      />

      <TouchableOpacity style={styles?.button} onPressOut={handleSubmit}>
        {status === 'pending' ? (
          <Text>Loading</Text>
        ) : (
          <Text style={{color: 'white'}}>Login</Text>
        )}
      </TouchableOpacity>
      {error && <Text>{error}</Text>}
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    gap: 10,
    alignItems: 'flex-start',
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    width: '100%',
    padding: 8,
  },
  button: {
    padding: 10,
    backgroundColor: 'red',
    width: 'auto',
    // color: 'white',
  },
});
