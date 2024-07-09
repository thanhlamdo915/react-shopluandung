import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
} from 'react-native';
import React, {useLayoutEffect, useEffect, useContext, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {
  Ionicons,
  AntDesign,
  MaterialIcons,
  FontAwesome,
} from '@expo/vector-icons';
import axios from 'axios';
import {UserType} from '../UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AdminPanel = () => {
  const {userId, setUserId} = useContext(UserType);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();

  const navigation = useNavigation();

  const logout = () => {
    clearAuthToken();
  };
  const clearAuthToken = async () => {
    await AsyncStorage.removeItem('authToken');
    console.log('auth token cleared');
    navigation.replace('Login');
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerStyle: {
        backgroundColor: '#822DE2',
      },
    });
  }, []);

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
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `https://backend-shopluandung.onrender.com/orders/${userId}`
        );
        const orders = response.data.orders;
        setOrders(orders);
        setLoading(false);
      } catch (error) {
        // console.log('error', error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}
      >
        <ScrollView
          style={{
            padding: 10,
            flex: 1,
            backgroundColor: 'white',
            paddingTop: 30,
          }}
        >
          {/* <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            // marginTop: 120,
          }}
        >
          <Pressable
            onPress={() => navigation.goBack()}
            style={{
              paddingBottom: 20,
              // backgroundColor: '#DAC0F7',
              borderRadius: 25,
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              //   justifyContent: 'center',
            }}
          >
            <AntDesign name="arrowleft" size={24} color="black" />
            <Text style={{textAlign: 'center', color: 'red'}}> go back</Text>
          </Pressable>
        </View> */}
          <Text style={{fontSize: 30, fontWeight: 'bold', paddingBottom: 20}}>
            Admin Panel Management
          </Text>
          <Text style={{fontSize: 16, fontWeight: '200'}}>
            ADMIN {user?.name}
          </Text>

          <View
            style={{
              flexDirection: 'column',
              // alignItems: 'center',
              gap: 10,
              marginTop: 12,
            }}
          >
            {/* <Text style={{fontSize: 20, fontWeight: 'bold', paddingBottom: 20}}>
            Management
          </Text> */}
            {/*Dashboard*/}
            <View style={{flex: 1, justifyContent: 'space-between'}}>
              <Pressable
                style={{
                  padding: 10,
                  paddingLeft: 20,
                  backgroundColor: '#DAC0F7',
                  borderRadius: 25,
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onPress={() => navigation.navigate('AdminDashboard')}
              >
                <FontAwesome name="dashboard" size={24} color="black" />
                <Text
                  style={{
                    margin: 10,
                    fontSize: 16,
                    color: 'black',
                  }}
                >
                  DASHBOARD
                </Text>
                <MaterialIcons
                  name="arrow-forward-ios"
                  size={24}
                  color="black"
                />
              </Pressable>
            </View>
            {/*All categories*/}
            <View style={{flex: 1, justifyContent: 'space-between'}}>
              <Pressable
                style={{
                  padding: 10,
                  paddingLeft: 20,
                  backgroundColor: '#DAC0F7',
                  borderRadius: 25,
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onPress={() => navigation.navigate('ManageCategoriesAdmin')}
              >
                <MaterialIcons name="category" size={24} color="black" />
                <Text
                  style={{
                    margin: 10,
                    fontSize: 16,
                    color: 'black',
                  }}
                >
                  All categories
                </Text>
                <MaterialIcons
                  name="arrow-forward-ios"
                  size={24}
                  color="black"
                />
              </Pressable>
            </View>
            {/*Create a new category*/}
            <View style={{flex: 1, justifyContent: 'space-between'}}>
              <Pressable
                style={{
                  padding: 10,
                  paddingLeft: 20,
                  backgroundColor: '#DAC0F7',
                  borderRadius: 25,
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onPress={() => navigation.navigate('AddNewCategory')}
              >
                <Ionicons name="add" size={24} color="black" />
                <Text
                  style={{
                    margin: 10,
                    fontSize: 16,
                    color: 'black',
                  }}
                >
                  Create a new category
                </Text>
                <MaterialIcons
                  name="arrow-forward-ios"
                  size={24}
                  color="black"
                />
              </Pressable>
            </View>
            {/*All Products*/}
            <View style={{flex: 1, justifyContent: 'space-between'}}>
              <Pressable
                style={{
                  padding: 10,
                  paddingLeft: 20,
                  backgroundColor: '#DAC0F7',
                  borderRadius: 25,
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onPress={() => navigation.navigate('ManageProductAdmin')}
              >
                <FontAwesome name="product-hunt" size={24} color="black" />
                <Text
                  style={{
                    margin: 10,
                    fontSize: 16,
                    color: 'black',
                  }}
                >
                  All Products
                </Text>
                <MaterialIcons
                  name="arrow-forward-ios"
                  size={24}
                  color="black"
                />
              </Pressable>
            </View>
            {/*Add a new product*/}
            <View style={{flex: 1, justifyContent: 'space-between'}}>
              <Pressable
                style={{
                  padding: 10,
                  paddingLeft: 20,
                  backgroundColor: '#DAC0F7',
                  borderRadius: 25,
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onPress={() => navigation.navigate('AddNewProduct')}
              >
                <Ionicons name="add" size={24} color="black" />
                <Text
                  style={{
                    margin: 10,
                    fontSize: 16,
                    color: 'black',
                  }}
                >
                  Add a new product
                </Text>
                <MaterialIcons
                  name="arrow-forward-ios"
                  size={24}
                  color="black"
                />
              </Pressable>
            </View>
            {/*Manage Orders*/}
            <View style={{flex: 1, justifyContent: 'space-between'}}>
              <Pressable
                style={{
                  padding: 10,
                  paddingLeft: 20,
                  backgroundColor: '#DAC0F7',
                  borderRadius: 25,
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onPress={() => navigation.navigate('ManageOrderAdmin')}
              >
                <MaterialIcons name="local-shipping" size={24} color="black" />
                <Text
                  style={{
                    margin: 10,
                    fontSize: 16,
                    color: 'black',
                  }}
                >
                  Manage Orders
                </Text>
                <MaterialIcons
                  name="arrow-forward-ios"
                  size={24}
                  color="black"
                />
              </Pressable>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              marginTop: 120,
            }}
          >
            <Pressable
              onPress={logout}
              style={{
                padding: 10,
                // backgroundColor: '#DAC0F7',
                borderRadius: 25,
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <AntDesign name="logout" size={24} color="red" />
              <Text style={{textAlign: 'center', color: 'red'}}> LOG OUT</Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default AdminPanel;

const styles = StyleSheet.create({});
