import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView, Pressable} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import axios from 'axios';
import AntDesign from '@expo/vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

const AdminDashboard = () => {
  const navigation = useNavigation();
  const [orderStats, setOrderStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    undeliveredOrders: 0,
    deliveredOrders: 0,
    ordersSentPerDay: 0,
    canceledOrders: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsResponse = await axios.get(
          'https://backend-shopluandung.onrender.com/order-stats'
        );
        setOrderStats(statsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <Pressable
              onPress={() => navigation.goBack()}
              style={{
                paddingBottom: 20,
                borderRadius: 25,
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <AntDesign name="arrowleft" size={24} color="black" />
              <Text style={{textAlign: 'center', color: 'red'}}> go back</Text>
            </Pressable>
          </View>
          <Text style={styles.title}>Admin Dashboard in 01 month</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statTitle}>Total Revenue</Text>
              <Text style={styles.statValue}>
                {Intl.NumberFormat({
                  style: 'currency',
                  currency: 'VND',
                }).format(orderStats.totalRevenue)}{' '}
              </Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statTitle}>Total Orders</Text>
              <Text style={styles.statValue}>{orderStats.totalOrders}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statTitle}>Undelivered Orders</Text>
              <Text style={styles.statValue}>
                {orderStats.undeliveredOrders}
              </Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statTitle}>Delivered Orders</Text>
              <Text style={styles.statValue}>{orderStats.deliveredOrders}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statTitle}>Orders Sent/Day</Text>
              <Text style={styles.statValue}>
                {orderStats.ordersSentPerDay}
              </Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statTitle}>Canceled Orders</Text>
              <Text style={styles.statValue}>{orderStats.canceledOrders}</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    paddingLeft: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statBox: {
    width: '48%',
    backgroundColor: '#f5f5f5',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  statTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    color: '#333',
  },
});

export default AdminDashboard;
