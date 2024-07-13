import {StyleSheet, Text, View, FlatList, Pressable, Image} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from 'axios';
import {AntDesign} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';
import {UserType} from '../UserContext';
import RNPickerSelect from 'react-native-picker-select';

const ManageOrderAdmin = () => {
  const navigation = useNavigation();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null); // New state for selected year
  const {userId} = useContext(UserType);
  const [user, setUser] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const months = [
    {label: 'January', value: '1'},
    {label: 'February', value: '2'},
    {label: 'March', value: '3'},
    {label: 'April', value: '4'},
    {label: 'May', value: '5'},
    {label: 'June', value: '6'},
    {label: 'July', value: '7'},
    {label: 'August', value: '8'},
    {label: 'September', value: '9'},
    {label: 'October', value: '10'},
    {label: 'November', value: '11'},
    {label: 'December', value: '12'},
  ];
  const years = [
    {label: '2020', value: '2020'},
    {label: '2021', value: '2021'},
    {label: '2022', value: '2022'},
    {label: '2023', value: '2023'},
    {label: '2024', value: '2024'},
  ];

  useEffect(() => {
    fetchOrders();
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

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `https://backend-shopluandung.onrender.com/orders`
      );
      const sortedOrders = response.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setOrders(sortedOrders);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchOrdersByMonth = async (month, year) => {
    try {
      const response = await axios.get(
        `https://backend-shopluandung.onrender.com/orders/${year}/${month}`
      );
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      // console.error(
      //   `Error fetching orders for month ${month} and year ${year}:`,
      //   error
      // );
      Alert.alert('You need select both moth and year');
    }
  };

  const updateOrderStatus = async (orderId, currentStatus) => {
    let newStatus;
    switch (currentStatus) {
      case 'Confirmed':
        newStatus = 'Shipped';
        break;
      case 'Shipped':
        newStatus = 'Delivered';
        break;
      default:
        Alert.alert('Error', 'Invalid status transition');
        return;
    }

    try {
      const response = await axios.put(
        `https://backend-shopluandung.onrender.com/order/${orderId}/status`,
        {
          status: newStatus,
          userId,
        }
      );
      const {order, totalRewardPoints} = response.data;

      const updatedOrders = orders.map((order) =>
        order._id === orderId
          ? {...order, status: newStatus, totalRewardPoints}
          : order
      );
      setOrders(updatedOrders);
      Alert.alert('Success', 'Order status updated successfully!');
    } catch (error) {
      console.error('Error updating order status:', error);
      Alert.alert('Error', 'Failed to update order status');
    }
  };

  const handleMonthChange = (value) => {
    setSelectedMonth(value);
    fetchOrdersByMonth(value, selectedYear); // Fetch orders for selected month and current selected year
  };

  const handleYearChange = (value) => {
    setSelectedYear(value);
    if (selectedMonth) {
      fetchOrdersByMonth(selectedMonth, value); // Fetch orders for current selected month and new selected year
    }
  };

  const renderOrderItem = ({item}) => (
    <View style={styles.orderItem}>
      <Text style={styles.orderText}>Order ID: {item._id}</Text>
      <Text style={styles.orderText}>
        Order Date: {new Date(item.createdAt).toLocaleDateString()}
      </Text>
      <Text style={styles.orderText}>
        Shipping Address: {item.shippingAddress.name},{' '}
        {item.shippingAddress.mobileNo}, {item.shippingAddress.street}
      </Text>

      {item.products.map((product, index) => (
        <View key={index} style={styles.productItem}>
          <Text style={styles.productText}>Product Name: {product.name}</Text>
          <Text style={styles.productText}>Quantity: {product.quantity}</Text>
          <Text style={styles.productText}>
            Price:{' '}
            {Intl.NumberFormat('it-IT', {
              style: 'currency',
              currency: 'VND',
            }).format(product.price)}
          </Text>
          {product.image.length > 0 && (
            <Image
              source={{uri: product.image[0]}}
              style={styles.productImage}
            />
          )}
        </View>
      ))}

      <Text style={styles.orderText}>
        Total Price :{' '}
        {Intl.NumberFormat('it-IT', {
          style: 'currency',
          currency: 'VND',
        }).format(item.totalPrice)}
      </Text>
      <Text style={styles.orderText}>Status: {item.status}</Text>
      <View style={styles.statusButtonsContainer}>
        {item.status === 'Confirmed' && (
          <Pressable
            style={styles.statusButton}
            onPress={() => updateOrderStatus(item._id, item.status)}
          >
            <Text style={styles.buttonText}>Ship</Text>
          </Pressable>
        )}
        {item.status === 'Shipped' && (
          <Pressable
            style={styles.statusButton}
            onPress={() => updateOrderStatus(item._id, item.status)}
          >
            <Text style={styles.buttonText}>Deliver</Text>
          </Pressable>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.goBackButton}
        >
          <AntDesign name="arrowleft" size={24} color="black" />
          <Text style={{textAlign: 'center', color: 'red'}}>
            {' '}
            Admin Dashboard
          </Text>
        </Pressable>
        <Text style={styles.header}>Order Management</Text>
      </View>

      <View style={styles.monthSelector}>
        <Text>Select Month:</Text>
        <RNPickerSelect
          placeholder={{label: 'Select a month...', value: null}}
          items={months}
          onValueChange={(value) => handleMonthChange(value)}
          style={pickerSelectStyles}
          value={selectedMonth}
        />
      </View>

      <View style={styles.monthSelector}>
        <Text>Select Year:</Text>
        <RNPickerSelect
          placeholder={{label: 'Select a year...', value: null}}
          items={years}
          onValueChange={(value) => handleYearChange(value)}
          style={pickerSelectStyles}
          value={selectedYear}
        />
      </View>

      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item._id}
        style={styles.orderList}
      />
    </SafeAreaView>
  );
};

export default ManageOrderAdmin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  goBackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 'auto',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  monthSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  orderItem: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  statusButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  statusButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#007bff',
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
