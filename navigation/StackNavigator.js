import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {
  Entypo,
  FontAwesome,
  MaterialIcons,
  AntDesign,
  Octicons,
} from '@expo/vector-icons';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ShoppingScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProductInfoScreen from '../screens/ProductInfoScreen';
import AddAddressScreen from '../screens/AddAddressScreen';
import AddressScreen from '../screens/AddressScreen';
import CartScreen from '../screens/CartScreen';
import ConfirmationScreen from '../screens/ConfirmationScreen';
import OrderScreen from '../screens/OrderScreen';
import LandingScreen from '../screens/ShoppingScreen';
import AdminPanel from '../screens/AdminPanel';
import ViewOrderHistory from '../screens/ViewOrderHistory';
import SearchPage from '../screens/SearchPage';
import CategoryProduct from '../screens/CategoryProduct';
import AddNewProduct from '../screens/AddNewProduct';
import ManageOrderAdmin from '../screens/ManageOrderAdmin';
import ChangePassword from '../screens/ChangePassword';
import AddNewCategory from '../screens/AddNewCategory';
import ManageCategoriesAdmin from '../screens/ManageCategoriesAdmin';
import ManageProductAdmin from '../screens/ManageProductAdmin';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import AdminDashboard from '../screens/AdminDashboard';
import AdminProductDetail from '../screens/AdminProductDetail';
import AdminLogin from '../screens/AdminLogin';
import UpdateAddressScreen from '../screens/UpdateAddressScreen';

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  function BottomTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={ShoppingScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarLabelStyle: {color: '#822DE2'},
            headerShown: false,
            tabBarIcon: ({focused}) =>
              focused ? (
                <Entypo name="home" size={24} color="black" />
              ) : (
                <AntDesign name="home" size={24} color="black" />
              ),
          }}
        />
        <Tab.Screen
          name="Shopping"
          component={LandingScreen}
          options={{
            tabBarLabel: 'Shopping',
            tabBarLabelStyle: {color: '#822DE2'},
            headerShown: false,

            tabBarIcon: ({focused}) =>
              focused ? (
                <Entypo name="shopping-cart" size={24} color="black" />
              ) : (
                <AntDesign name="shoppingcart" size={24} color="black" />
              ),
          }}
        />
        <Tab.Screen
          name="History"
          component={ViewOrderHistory}
          options={{
            tabBarLabel: 'Orders',
            tabBarLabelStyle: {color: '#822DE2'},
            headerShown: false,
            tabBarIcon: ({focused}) =>
              focused ? (
                <FontAwesome name="history" size={24} color="black" />
              ) : (
                <MaterialIcons name="history" size={24} color="black" />
              ),
          }}
        />

        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Profile',
            tabBarLabelStyle: {color: '#822DE2'},
            headerShown: false,
            tabBarIcon: ({focused}) =>
              focused ? (
                <Octicons name="feed-person" size={24} color="black" />
              ) : (
                <Octicons name="person" size={24} color="black" />
              ),
          }}
        />
      </Tab.Navigator>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Info"
          component={ProductInfoScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Address"
          component={AddAddressScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Add"
          component={AddressScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Confirm"
          component={ConfirmationScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Order"
          component={OrderScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AdminPanel"
          component={AdminPanel}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ViewOrderHistory"
          component={ViewOrderHistory}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SearchPage"
          component={SearchPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CategoryProduct"
          component={CategoryProduct}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddNewProduct"
          component={AddNewProduct}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddNewCategory"
          component={AddNewCategory}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ManageCategoriesAdmin"
          component={ManageCategoriesAdmin}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ManageProductAdmin"
          component={ManageProductAdmin}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ManageOrderAdmin"
          component={ManageOrderAdmin}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AdminDashboard"
          component={AdminDashboard}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AdminProductDetail"
          component={AdminProductDetail}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AdminLogin"
          component={AdminLogin}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UpdateAddressScreen"
          component={UpdateAddressScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
