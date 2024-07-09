import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  KeyboardAvoidingView,
  TextInput,
  Alert,
} from 'react-native';
import axios from 'axios';
import {MaterialIcons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();
  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert('Email Required', 'Please enter your email address');
      return;
    }

    try {
      const response = await axios.post(
        'https://backend-shopluandung.onrender.com/forgot-password',
        {email}
      );
      Alert.alert(
        'Email Sent',
        'A password reset email has been sent to your email address'
      );
      setEmail('');
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        Alert.alert('Error', error.response.data.message);
      } else {
        Alert.alert('Error', 'An error occurred while processing your request');
      }
      console.log('Forgot Password request failed', error);
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
              Forgot Password
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
                  fontSize: 16,
                }}
                placeholder="Enter your Email"
              />
            </View>
          </View>

          <View style={{marginTop: 80}} />

          <Pressable
            onPress={handleForgotPassword}
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
              Reset Password
            </Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.goBack()}
            style={{marginTop: 15}}
          >
            <Text style={{textAlign: 'center', color: 'gray', fontSize: 16}}>
              Remembered? Sign In
            </Text>
          </Pressable>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({});
