// import React, {useEffect, useState} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   Pressable,
//   Button,
// } from 'react-native';
// import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
// import axios from 'axios';
// import AntDesign from '@expo/vector-icons/AntDesign';
// import {useNavigation} from '@react-navigation/native';
// import DateTimePicker from '@react-native-community/datetimepicker';

// const AdminDashboard = () => {
//   const navigation = useNavigation();
//   const [date, setDate] = useState(() => {
//     const initialDate = new Date();
//     // Set time to midnight
//     initialDate.setHours(0, 0, 0, 0);
//     return initialDate;
//   });
//   const [nextdate, setNextDate] = useState(() => {
//     const initialDate = new Date();
//     // Set time to midnight
//     initialDate.setHours(0, 0, 0, 0);
//     return initialDate;
//   });
//   const [mode, setMode] = useState('date');
//   const [show, setShow] = useState(false);
//   const [nextmode, setNextMode] = useState('date');
//   const [nextshow, setNextShow] = useState(false);
//   console.log('date', date);
//   console.log('nextdate', nextdate);
//   const onChange = (event, selectedDate) => {
//     const currentDate = selectedDate;
//     setShow(false);
//     setDate(currentDate);
//   };

//   const showMode = (currentMode) => {
//     setShow(true);
//     setMode(currentMode);
//   };

//   const showDatepicker = () => {
//     showMode('date');
//   };

//   const onNextChange = (nextevent, selectedNextDate) => {
//     const nextDate = selectedNextDate;
//     setNextShow(false);
//     setNextDate(nextDate);
//   };

//   const showNextMode = (nextMode) => {
//     setNextShow(true);
//     setNextMode(nextMode);
//   };

//   const showNextDatepicker = () => {
//     showNextMode('date');
//   };
//   const [orderStats, setOrderStats] = useState({
//     totalRevenue: 0,
//     totalOrders: 0,
//     undeliveredOrders: 0,
//     deliveredOrders: 0,
//     ordersSentPerDay: 0,
//     canceledOrders: 0,
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const statsResponse = await axios.get(
//           'https://backend-shopluandung.onrender.com/order-stats'
//         );
//         setOrderStats(statsResponse.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
//     fetchData();
//   }, []);

//   return (
//     <SafeAreaProvider>
//       <SafeAreaView style={styles.container}>
//         <ScrollView>
//           <View
//             style={{
//               flexDirection: 'row',
//               alignItems: 'center',
//               gap: 10,
//             }}
//           >
//             <Pressable
//               onPress={() => navigation.goBack()}
//               style={{
//                 paddingBottom: 20,
//                 borderRadius: 25,
//                 flex: 1,
//                 flexDirection: 'row',
//                 alignItems: 'center',
//               }}
//             >
//               <AntDesign name="arrowleft" size={24} color="black" />
//               <Text style={{textAlign: 'center', color: 'red'}}> go back</Text>
//             </Pressable>
//           </View>

//           <Text style={styles.title}>Admin Dashboard in 01 month</Text>
//           <Button onPress={showDatepicker} title="From" />
//           <Text>From {date.toLocaleString()}</Text>
//           {show && (
//             <DateTimePicker
//               testID="dateTimePicker"
//               value={date}
//               mode={mode}
//               // is24Hour={true}
//               onChange={onChange}
//             />
//           )}
//           <Button onPress={showNextDatepicker} title="To" />
//           <Text>To {nextdate.toLocaleString()}</Text>
//           {nextshow && (
//             <DateTimePicker
//               testID="dateTimePicker"
//               value={nextdate}
//               mode={nextmode}
//               // is24Hour={true}
//               onChange={onNextChange}
//             />
//           )}

//           <View style={styles.statsContainer}>
//             <View style={styles.statBox}>
//               <Text style={styles.statTitle}>Total Revenue</Text>
//               <Text style={styles.statValue}>
//                 {Intl.NumberFormat({
//                   style: 'currency',
//                   currency: 'VND',
//                 }).format(orderStats.totalRevenue)}{' '}
//               </Text>
//             </View>
//             <View style={styles.statBox}>
//               <Text style={styles.statTitle}>Total Orders</Text>
//               <Text style={styles.statValue}>{orderStats.totalOrders}</Text>
//             </View>
//             <View style={styles.statBox}>
//               <Text style={styles.statTitle}>Undelivered Orders</Text>
//               <Text style={styles.statValue}>
//                 {orderStats.undeliveredOrders}
//               </Text>
//             </View>
//             <View style={styles.statBox}>
//               <Text style={styles.statTitle}>Delivered Orders</Text>
//               <Text style={styles.statValue}>{orderStats.deliveredOrders}</Text>
//             </View>
//             <View style={styles.statBox}>
//               <Text style={styles.statTitle}>Orders Sent/Day</Text>
//               <Text style={styles.statValue}>
//                 {orderStats.ordersSentPerDay}
//               </Text>
//             </View>
//             <View style={styles.statBox}>
//               <Text style={styles.statTitle}>Canceled Orders</Text>
//               <Text style={styles.statValue}>{orderStats.canceledOrders}</Text>
//             </View>
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </SafeAreaProvider>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#fff',
//     paddingLeft: 10,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     textAlign: 'center',
//   },
//   statsContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//   },
//   statBox: {
//     width: '48%',
//     backgroundColor: '#f5f5f5',
//     padding: 16,
//     marginVertical: 8,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   statTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   statValue: {
//     fontSize: 20,
//     color: '#333',
//   },
// });

// export default AdminDashboard;

import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Button,
} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import axios from 'axios';
import AntDesign from '@expo/vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

const AdminDashboard = () => {
  const navigation = useNavigation();
  const [date, setDate] = useState(() => {
    const initialDate = new Date();
    initialDate.setHours(0, 0, 0, 0); // Set time to midnight
    return initialDate;
  });
  const [nextDate, setNextDate] = useState(() => {
    const initialDate = new Date();
    initialDate.setHours(0, 0, 0, 0); // Set time to midnight
    return initialDate;
  });
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [nextMode, setNextMode] = useState('date');
  const [nextShow, setNextShow] = useState(false);

  const [orderStats, setOrderStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    averageSales: 0,
    totalProductsSold: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const startDateString = date.toISOString();
        const endDateString = nextDate.toISOString();

        const statsResponse = await axios.get(
          'https://backend-shopluandung.onrender.com/order-stats',
          {
            params: {
              startDate: startDateString,
              endDate: endDateString,
            },
          }
        );
        setOrderStats(statsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [date, nextDate]);

  const onChange = (event, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      selectedDate.setHours(0, 0, 0, 0); // Remove time part
      setDate(selectedDate);
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const onNextChange = (nextevent, selectedNextDate) => {
    setNextShow(false);
    if (selectedNextDate) {
      selectedNextDate.setHours(0, 0, 0, 0); // Remove time part
      setNextDate(selectedNextDate);
    }
  };

  const showNextMode = (nextMode) => {
    setNextShow(true);
    setNextMode(nextMode);
  };

  const showNextDatepicker = () => {
    showNextMode('date');
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
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
              <Text style={{textAlign: 'center', color: 'red'}}>
                {' '}
                Admin Dashboard
              </Text>
            </Pressable>
          </View>

          <Text style={styles.title}>Admin Data Center</Text>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Button onPress={showDatepicker} title="Select start time" />
            <Text style={{marginLeft: 10}}>{date.toLocaleDateString()}</Text>

            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                onChange={onChange}
              />
            )}
          </View>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Button onPress={showNextDatepicker} title="Select end time" />
            <Text style={{marginLeft: 18}}>
              {nextDate.toLocaleDateString()}
            </Text>
            {nextShow && (
              <DateTimePicker
                testID="dateTimePicker"
                value={nextDate}
                mode={nextMode}
                onChange={onNextChange}
              />
            )}
          </View>

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
              <Text style={styles.statTitle}>Average Sales</Text>
              <Text style={styles.statValue}>
                {Intl.NumberFormat({
                  style: 'currency',
                  currency: 'VND',
                }).format(orderStats.averageSales)}
              </Text>
            </View>
            {/* <View style={styles.statBox}>
              <Text style={styles.statTitle}>Total Products Sold</Text>
              <Text style={styles.statValue}>
                {orderStats.totalProductsSold}
              </Text>
            </View> */}
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
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  statBox: {
    width: '48%',
    backgroundColor: '#f5f5f5',
    padding: 40,
    marginVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 100,
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
