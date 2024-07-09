import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Alert,
} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import React, {useState} from 'react';
import {MaterialIcons} from '@expo/vector-icons';
import {AntDesign} from '@expo/vector-icons';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reEnterPassword, setReEnterPassword] = useState('');

  const [name, setName] = useState('');
  const navigation = useNavigation();
  const handleRegister = () => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!emailPattern.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
      return;
    }
    if (password !== reEnterPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match');
      return;
    }
    const user = {
      name: name,
      email: email,
      password: password,
    };

    // send a POST  request to the backend API to register the user
    axios
      .post('https://backend-shopluandung.onrender.com/register', user)
      .then((response) => {
        console.log(response);
        Alert.alert(
          'Registration successful',
          'You have been registered Successfully'
        );
        setName('');
        setEmail('');
        setPassword('');
        setReEnterPassword('');
      })
      .catch((error) => {
        // Alert.alert(
        //   'Registration Error',
        //   // 'An error occurred while registering',
        //   'Email has been already registered'
        // );
        // console.log('registration failed', error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          Alert.alert('Registration Error', error.response.data.message);
        } else {
          Alert.alert(
            'Registration Error',
            'An error occurred while registering'
          );
        }
        console.log('Registration failed', error);
      });
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
              Register to your Account
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
              <Ionicons
                name="person-circle"
                size={26}
                color="#808080"
                style={{paddingLeft: 8}}
              />
              <TextInput
                value={name}
                onChangeText={(text) => setName(text)}
                style={{
                  color: 'gray',
                  marginVertical: 10,
                  width: 300,
                  fontSize: name ? 16 : 16,
                }}
                placeholder="enter your name"
              />
            </View>

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
                  fontSize: password ? 16 : 16,
                }}
                placeholder="enter your Email"
              />
            </View>
          </View>

          <View>
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
                  fontSize: email ? 16 : 16,
                }}
                placeholder="enter your Password"
              />
            </View>
          </View>
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
              value={reEnterPassword}
              onChangeText={(text) => setReEnterPassword(text)}
              secureTextEntry={true}
              style={{
                color: 'gray',
                marginVertical: 10,
                width: 300,
                fontSize: 16,
              }}
              placeholder="Re-enter your password"
            />
          </View>

          <View style={{marginTop: 80}} />

          <Pressable
            onPress={handleRegister}
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
              Register
            </Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.goBack()}
            style={{marginTop: 15}}
          >
            <Text style={{textAlign: 'center', color: 'gray', fontSize: 16}}>
              Already have an account? Sign In
            </Text>
          </Pressable>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
