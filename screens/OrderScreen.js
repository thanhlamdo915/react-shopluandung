import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

const OrderScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Main');
    }, 1300);
  }, []);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        <View
          // source={require('../assets/thumbs.json')}
          // ref={animation}
          style={{
            height: 260,
            width: 300,
            alignSelf: 'center',
            marginTop: 40,
            justifyContent: 'center',
          }}
          autoPlay
          loop={false}
          speed={0.7}
        />
        <Text
          style={{
            marginTop: 20,
            fontSize: 19,
            fontWeight: '600',
            textAlign: 'center',
          }}
        >
          Your Order Has been Received
        </Text>
        <View
          // source={require('../assets/sparkle.json')}
          style={{
            height: 300,
            position: 'absolute',
            top: 100,
            width: 300,
            alignSelf: 'center',
          }}
          autoPlay
          loop={false}
          speed={0.7}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({});
