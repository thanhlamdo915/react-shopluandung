import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {MaterialIcons} from '@expo/vector-icons';
import {AntDesign} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');

        if (token) {
          navigation.replace('Main');
        }
      } catch (err) {
        console.log('error message', err);
      }
    };
    checkLoginStatus();
  }, []);
  const handleLogin = async () => {
    const user = {email, password};

    try {
      const response = await axios.post(
        'https://backend-shopluandung.onrender.com/login',
        user
      );
      Alert.alert('Login successful', 'You have been logged in successfully');
      const token = response.data.token;

      await AsyncStorage.setItem('authToken', token);
      navigation.replace('Main'); // Replace with your main screen route
      // if (user.isAdmin == 'true') {
      //   navigation.navigate('AdminPanel');
      // } else {
      //   navigation.navigate('Main');
      // }
    } catch (error) {
      Alert.alert('Login Error', 'Invalid email or password');
      console.log('Login error:', error);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: 'white',
          alignItems: 'center',
          marginTop: 50,
        }}
      >
        <View>
          <Image
            style={{width: 150, height: 100}}
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7eoMSY9qiGgiLHvsXpzG8MzcltUW68IsZBQ&s',
            }}
          />
        </View>

        <KeyboardAvoidingView>
          <View style={{alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: 'bold',
                marginTop: 12,
                color: '#041E42',
              }}
            >
              Sign in to get the best deals
            </Text>
          </View>

          <View style={{marginTop: 70}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
                backgroundColor: '#D0D0D0',
                paddingVertical: 5,
                borderRadius: 5,
                marginTop: 30,
              }}
            >
              <MaterialIcons
                style={{marginLeft: 8}}
                name="email"
                size={24}
                color="gray"
              />

              <TextInput
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={{
                  color: 'gray',
                  marginVertical: 10,
                  width: 300,
                  fontSize: email ? 16 : 16,
                }}
                placeholder="enter your Email"
              />
            </View>
          </View>

          <View style={{marginTop: 10}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
                backgroundColor: '#D0D0D0',
                paddingVertical: 5,
                borderRadius: 5,
                marginTop: 30,
              }}
            >
              <AntDesign
                name="lock1"
                size={24}
                color="gray"
                style={{marginLeft: 8}}
              />

              <TextInput
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
                style={{
                  color: 'gray',
                  marginVertical: 10,
                  width: 300,
                  fontSize: password ? 16 : 16,
                }}
                placeholder="enter your Password"
              />
            </View>
          </View>

          <View
            style={{
              marginTop: 12,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {/* <Text>Keep me logged in</Text> */}

            <Pressable
              onPress={() => {
                navigation.navigate('ForgotPasswordScreen');
              }}
            >
              <Text style={{color: '#007FFF', fontWeight: '500'}}>
                Forgot Password
              </Text>
            </Pressable>
          </View>

          <View
            style={{
              marginTop: 12,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {/* <Text>Keep me logged in</Text> */}

            <Pressable
              onPress={() => {
                navigation.navigate('AdminLogin');
              }}
            >
              <Text style={{color: '#007FFF', fontWeight: '500'}}>
                Login be an admin
              </Text>
            </Pressable>
          </View>

          <View style={{marginTop: 80}} />

          <Pressable
            onPress={handleLogin}
            style={{
              width: 200,
              backgroundColor: '#FEBE10',
              borderRadius: 6,
              marginLeft: 'auto',
              marginRight: 'auto',
              padding: 15,
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontSize: 16,
                fontWeight: 'bold',
              }}
            >
              Login
            </Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate('Register')}
            style={{marginTop: 15}}
          >
            <Text style={{textAlign: 'center', color: 'gray', fontSize: 16}}>
              Don't have an account? Sign Up
            </Text>
          </Pressable>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
