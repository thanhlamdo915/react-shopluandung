import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
import {UserType} from '../UserContext';
import axios from 'axios';
import {useNavigation, useRoute} from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';

const UpdateAddressScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {addressId} = route.params; // Assume you pass the addressId as a parameter
  const [name, setName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [houseNo, setHouseNo] = useState('');
  const [street, setStreet] = useState('');
  const [landmark, setLandmark] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const {userId, setUserId} = useContext(UserType);
  //   console.log('ad2', route.params);

  const fetchUser = async () => {
    const token = await AsyncStorage.getItem('authToken');
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.userId;
    setUserId(userId);
  };
  //   console.log('user', userId);
  const fetchAddress = async () => {
    try {
      const response = await axios.get(
        `https://backend-shopluandung.onrender.com/users/${userId}/addresses/${addressId}`
      );
      const address = response.data;

      setName(address.name);
      setMobileNo(address.mobileNo);
      setHouseNo(address.houseNo);
      setStreet(address.street);
      setLandmark(address.landmark);
      //   setCity(address.city);
      //   setCountry(address.country);
      setPostalCode(address.postalCode);
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };
  useEffect(() => {
    fetchUser();
    fetchAddress();
  }, [addressId]);

  const handleUpdateAddress = () => {
    const updatedAddress = {
      name,
      mobileNo,
      houseNo,
      street,
      landmark,
      postalCode,
    };

    axios
      .put(
        `https://backend-shopluandung.onrender.com/users/${userId}/addresses/${addressId}`,
        updatedAddress
      )
      .then((response) => {
        Alert.alert('Success', 'Address updated successfully');
        setTimeout(() => {
          navigation.goBack();
        }, 500);
      })
      .catch((error) => {
        Alert.alert('Error', 'Failed to update address');
        console.log('Error', error);
      });
  };

  return (
    <ScrollView style={{marginTop: 50}}>
      <View style={{height: 50, backgroundColor: '#822DE2'}}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            // justifyContent: 'space-between',
          }}
        >
          <AntDesign name="arrowleft" size={24} color="black" />
          <Text style={{textAlign: 'center', color: 'white'}}> Go back</Text>
        </Pressable>
      </View>

      <View style={{padding: 10}}>
        <View style={{marginVertical: 10}}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: 'bold',
              color: 'black',
            }}
          >
            UPDATE YOUR ADDRESS
          </Text>
          <Text style={{fontSize: 15, fontWeight: 'bold'}}>
            Full name (First and last name)
          </Text>

          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            placeholderTextColor={'black'}
            style={{
              padding: 10,
              borderColor: '#D0D0D0',
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Enter your name"
          />
        </View>

        <View>
          <Text style={{fontSize: 15, fontWeight: 'bold'}}>Mobile number</Text>

          <TextInput
            value={mobileNo}
            onChangeText={(text) => setMobileNo(text)}
            placeholderTextColor={'black'}
            style={{
              padding: 10,
              borderColor: '#D0D0D0',
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Mobile No"
          />
        </View>

        <View style={{marginVertical: 10}}>
          <Text style={{fontSize: 15, fontWeight: 'bold'}}>House No</Text>

          <TextInput
            value={houseNo}
            onChangeText={(text) => setHouseNo(text)}
            placeholderTextColor={'black'}
            style={{
              padding: 10,
              borderColor: '#D0D0D0',
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder=""
          />
        </View>

        <View>
          <Text style={{fontSize: 15, fontWeight: 'bold'}}>
            Street, Town, Province
          </Text>
          <TextInput
            value={street}
            onChangeText={(text) => setStreet(text)}
            placeholderTextColor={'black'}
            style={{
              padding: 10,
              borderColor: '#D0D0D0',
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder=""
          />
        </View>

        <View style={{marginVertical: 10}}>
          <Text style={{fontSize: 15, fontWeight: 'bold'}}>Landmark</Text>
          <TextInput
            value={landmark}
            onChangeText={(text) => setLandmark(text)}
            placeholderTextColor={'black'}
            style={{
              padding: 10,
              borderColor: '#D0D0D0',
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Eg near Apollo hospital"
          />
        </View>

        <View>
          <Text style={{fontSize: 15, fontWeight: 'bold'}}>Pincode</Text>

          <TextInput
            value={postalCode}
            onChangeText={(text) => setPostalCode(text)}
            placeholderTextColor={'black'}
            style={{
              padding: 10,
              borderColor: '#D0D0D0',
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Enter Pincode"
          />
        </View>

        <Pressable
          onPress={handleUpdateAddress}
          style={{
            backgroundColor: '#FFC72C',
            padding: 19,
            borderRadius: 6,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}
        >
          <Text style={{fontWeight: 'bold'}}>Update Address</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default UpdateAddressScreen;

const styles = StyleSheet.create({});
