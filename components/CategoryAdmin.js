import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const CategoryAdmin = ({item, handleCategoryClick}) => {
  return (
    // <View style={{height: 63, width: 63, paddingTop: 7}}>
    <View>
      <Pressable
        style={{}}
        onPress={() => {
          console.log('Category ID:', item._id);
          handleCategoryClick(item);
        }}
      >
        <Image
          source={{uri: item?.image}}
          style={{
            height: 80,
            width: 80,
            borderRadius: 80 / 2,
          }}
        />
        {/* <View style={{height: 20, width: 40, flex: 'wrap'}}> */}
        <View style={{height: 20, width: 40}}>
          <Text style={{fontSize: 10}}>{item.name}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default CategoryAdmin;

const styles = StyleSheet.create({});
