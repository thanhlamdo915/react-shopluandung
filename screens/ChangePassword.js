import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Alert,
  Pressable,
} from 'react-native';
import axios from 'axios';
import {useEffect} from 'react';
import {useContext} from 'react';
import {UserType} from '../UserContext';
import {useNavigation} from '@react-navigation/native';
import {AntDesign} from '@expo/vector-icons';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const {userId, setUserId} = useContext(UserType);
  const [user, setUser] = useState();
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigation = useNavigation();
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        console.log('Fetching profile for user ID:', userId); // Log userId for debugging
        if (!userId) {
          console.log('No user ID provided');
          return;
        }
        const response = await axios.get(
          `https://backend-shopluandung.onrender.com/profile/${userId}`
        );
        const {user} = response.data;
        setUser(user);
      } catch (error) {
        console.log('error', error);
      }
    };
    fetchUserProfile();
  }, [userId, modalVisible]);
  const [modalVisible, setModalVisible] = useState(false);
  const handleChangePassword = async () => {
    try {
      // const userId = 'replace-with-your-user-id'; // Replace with actual user ID
      if (newPassword !== confirmPassword) {
        Alert.alert('Error', 'Passwords do not match');
        return;
      }
      const response = await axios.put(
        `https://backend-shopluandung.onrender.com/${userId}/password`,
        {
          currentPassword,
          newPassword,
        }
      );
      Alert.alert(
        'Successful change the password, please log in again',
        response.data.message
      );
      clearAuthToken();
      // navigation.replace('Login');
    } catch (error) {
      console.log('new pass', newPassword);
      console.log('confirm pass', confirmPassword);
      console.error('Error changing password:', error);
      Alert.alert('Error', 'New password is invalid');
    }
  };
  // const clearAuthToken = async () => {
  //   await AsyncStorage.removeItem('authToken');
  //   console.log('auth token cleared');
  //   navigation.replace('Login');
  // };
  return (
    <View style={styles.container}>
      <View style={{height: 50}}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}
        >
          <AntDesign name="arrowleft" size={24} color="black" />
          <Text style={{textAlign: 'center', color: '#822DE2'}}> Go back</Text>
        </Pressable>
      </View>
      <Text style={styles.label}>Current Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="Enter your current password"
        value={currentPassword}
        onChangeText={setCurrentPassword}
      />
      <Text style={styles.label}>New Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="Enter your new password"
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <Text style={styles.label}>Confirm New Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="Confirm your new password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <Button title="Change Password" onPress={handleChangePassword} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    paddingVertical: 70,
    paddingHorizontal: 20,
  },
  label: {
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default ChangePassword;
